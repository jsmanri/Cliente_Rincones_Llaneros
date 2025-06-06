import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MapaComponent } from '../mapa/mapa.component';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { API_URLS } from '../../../../config/api-config';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {

  sitioForm: FormGroup;
  mostrarModal = false;
  politicasAceptadas = false;
  registroExitoso = false;
  imagenesPreview: string[] = [];
  imagenesBase64: string[] = [];
  categorias: any[] = [];
  municipio: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
    this.sitioForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      horario: ['', Validators.required],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      categoria: [null, Validators.required], // ← se guarda el ID directamente
      municipio: [null, Validators.required], // ← se guarda el ID directamente
      imagenes: [null],
      latitud: [''],
      longitud: ['']
    });
  }



  ngOnInit(): void {
  this.apiService.get<any>(API_URLS.CRUD.Api_crudCategorias).subscribe({
    next: (data) => {
      if (data && Array.isArray(data["categorias consultadas"])) {
        this.categorias = data["categorias consultadas"];
      } else {
        this.categorias = [];
        console.warn('La respuesta no contiene un arreglo de categorías:', data);
      }
    },
    error: (err) => {
      console.error('Error al cargar categorías:', err);
    }
  });
    this.apiService.get<any>(API_URLS.CRUD.Api_crudMunicipios).subscribe({
    next: (data) => {
      if (data && Array.isArray(data["municipios consultados"])) {
        this.municipio = data["municipios consultados"];
      } else {
        this.municipio = [];
        console.warn('La respuesta no contiene un arreglo de municipios:', data);
      }
    },
    error: (err) => {
      console.error('Error al cargar los municipios:', err);
    }
  });
  }


  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newPreviews: string[] = [];
      const base64Array: string[] = [];
      let filesProcessed = 0;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64 = e.target.result;
          newPreviews.push(base64);
          base64Array.push(base64);
          filesProcessed++;

          if (filesProcessed === files.length) {
            this.imagenesPreview = [...this.imagenesPreview, ...newPreviews];
            this.imagenesBase64 = [...this.imagenesBase64, ...base64Array];
          }
        };

        reader.readAsDataURL(file);
      }

      this.sitioForm.patchValue({ imagenes: files });
      this.sitioForm.get('imagenes')?.updateValueAndValidity();
    }
  }

  eliminarImagen(index: number): void {
    this.imagenesPreview.splice(index, 1);
    this.imagenesBase64.splice(index, 1);

    const currentFiles: File[] = this.sitioForm.get('imagenes')?.value ?? [];
    if (index >= 0 && index < currentFiles.length) {
      currentFiles.splice(index, 1);
    }

    const dataTransfer = new DataTransfer();
    currentFiles.forEach(file => dataTransfer.items.add(file));

    this.sitioForm.patchValue({
      imagenes: dataTransfer.files.length > 0 ? dataTransfer.files : null
    });

    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.files = dataTransfer.files;
  }

  abrirModal(): void {
    if (this.sitioForm.valid) {
      this.mostrarModal = true;
    } else {
      this.sitioForm.markAllAsTouched();
    }
  }

  aceptarPoliticas(): void {
    this.politicasAceptadas = true;
    this.mostrarModal = false;
    this.registrarSitio();
  }

  registrarSitio(): void {
    if (this.sitioForm.valid && this.politicasAceptadas) {
      const datosSitio = {
        NombreSitioTuristico: this.sitioForm.value.nombre,
        DescripcionSitioTuristico: this.sitioForm.value.descripcion,
        Ubicacion: this.sitioForm.value.direccion,
        Horario: this.sitioForm.value.horario,
        Latitud: Number(this.sitioForm.value.latitud),
        Longitud: Number(this.sitioForm.value.longitud),
        FotoSitio: JSON.stringify(this.imagenesBase64),
        IdCategoria: { Id: this.sitioForm.value.categoria },
        IdMunicipio: { Id: this.sitioForm.value.municipio },
        IdUsuario: { Id: 1 } // puedes ajustar el ID del usuario según tu lógica
      };

      console.log('Datos del sitio (para enviar al backend):', datosSitio);


      this.apiService.post<any>(API_URLS.CRUD.Api_crudRegistrarSitio, datosSitio).subscribe({
      next: (respuesta) => {
      console.log('Registro exitoso:', respuesta);
      this.registroExitoso = true;
      this.resetFormulario();
      setTimeout(() => this.registroExitoso = false, 5000);
      },
      error: (error) => {
      console.error('Error al registrar sitio turístico:', error);
      }
      });


      this.registroExitoso = true;
      this.resetFormulario();
      setTimeout(() => this.registroExitoso = false, 5000);
    }
  }


  resetFormulario(): void {
  this.sitioForm.reset();
  this.sitioForm.markAsPristine();
  this.sitioForm.markAsUntouched();
  this.sitioForm.updateValueAndValidity();

  this.imagenesPreview = [];
  this.imagenesBase64 = [];
  this.politicasAceptadas = false;

  const fileInput = document.getElementById('file-upload') as HTMLInputElement;
  if (fileInput) fileInput.value = '';
  }


  actualizarUbicacion(event: { latitud: number; longitud: number }): void {
    this.sitioForm.patchValue({
      latitud: event.latitud,
      longitud: event.longitud
    });
  }

  abrirMapa(): void {
    const dialogRef = this.dialog.open(MapaComponent, {
      width: '700px',
      height: '500px',
      disableClose: false,
    });

    dialogRef.componentInstance.ubicacionSeleccionada.subscribe((coords: { latitud: number; longitud: number }) => {
      this.actualizarUbicacion(coords);
      dialogRef.close();
    });
  }
}