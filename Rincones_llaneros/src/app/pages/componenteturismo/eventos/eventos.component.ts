import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.services';
import { API_URLS } from '../../../../config/api-config';

interface SitioTuristico {
  Id: number;
  NombreSitioTuristico: string;
}

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css',
})
export class EventosComponent implements OnInit {
  eventoForm: FormGroup;
  sitios: SitioTuristico[] = [];
  userId: number = 18; // Cambia esto según tu lógica de usuario
  imagenesPreview: string[] = [];
  imagenesBase64: string[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      sitio: ['', Validators.required], // Aquí se guarda el ID del sitio seleccionado
      imagenes: [null],
    });
  }

  ngOnInit(): void {
    this.cargarSitiosTuristicos();
  }

  cargarSitiosTuristicos(): void {
    const url = `${API_URLS.CRUD.Api_crudRegistrarSitio}?query=IdUsuario.Id:${this.userId}&limit=0`;
    this.apiService.get<any>(url).subscribe({
      next: (data) => {
        console.log(data);
        this.sitios = (data['sitios consultados'] ?? []).map((sitio: any) => ({
          Id: sitio.Id,
          NombreSitioTuristico: sitio.NombreSitioTuristico,
        }));
      },
      error: (error) => {
        console.error('Error al traer sitios turísticos', error);
        this.sitios = [];
      },
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    const maxImagenes = 3;

    if (files && files.length > 0) {
      const disponibles = maxImagenes - this.imagenesPreview.length;

      if (disponibles <= 0) {
        return; // Ya tienes 3 imágenes, no se permite más
      }

      const filesToProcess: File[] = Array.from(files as FileList).slice(
        0,
        disponibles
      );
      const newPreviews: string[] = [];
      const base64Array: string[] = [];
      let filesProcessed = 0;

      filesToProcess.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const base64 = e.target.result;
          newPreviews.push(base64);
          base64Array.push(base64);
          filesProcessed++;

          if (filesProcessed === filesToProcess.length) {
            // Agrega y limita a máximo 3
            this.imagenesPreview = [
              ...this.imagenesPreview,
              ...newPreviews,
            ].slice(0, 3);
            this.imagenesBase64 = [
              ...this.imagenesBase64,
              ...base64Array,
            ].slice(0, 3);

            // Construye el nuevo FileList limitado a 3
            const dataTransfer = new DataTransfer();
            for (let i = 0; i < filesToProcess.length && i < maxImagenes; i++) {
              dataTransfer.items.add(filesToProcess[i]);
            }

            this.eventoForm.patchValue({
              imagenes: dataTransfer.files,
            });
            this.eventoForm.get('imagenes')?.updateValueAndValidity();
          }
        };

        reader.readAsDataURL(file);
      });
    }
  }

  eliminarImagen(index: number): void {
    this.imagenesPreview.splice(index, 1);
    this.imagenesBase64.splice(index, 1);

    const currentFiles: File[] = this.eventoForm.get('imagenes')?.value ?? [];
    if (index >= 0 && index < currentFiles.length) {
      currentFiles.splice(index, 1);
    }

    const dataTransfer = new DataTransfer();
    currentFiles.forEach((file) => dataTransfer.items.add(file));

    this.eventoForm.patchValue({
      imagenes: dataTransfer.files.length > 0 ? dataTransfer.files : null,
    });

    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    if (fileInput) fileInput.files = dataTransfer.files;
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      const datos = this.eventoForm.value;

      const payload = {
        IdUsuario: {
          Id: this.userId,
        },
        IdSitioTuristico: {
          Id: datos.sitio,
        },
        NombreEvento: datos.nombre,
        DescripcionEvento: datos.descripcion,
        FechaHoraInicioEvento: new Date(datos.inicio).toISOString(),
        FechaHoraFinalizacionEvento: new Date(datos.fin).toISOString(),
        FotosEvento: JSON.stringify(
          this.imagenesBase64.map((img) => ({
            imagen_base64: img,
          }))
        ),
      };

      const url = API_URLS.CRUD.Api_crudEventos;

      this.apiService.post<any>(url, payload).subscribe({
        next: (response) => {
          console.log('Evento creado exitosamente:', response);
          // Aquí puedes resetear el formulario o mostrar mensaje de éxito
          this.eventoForm.reset();
          this.imagenesPreview = [];
          this.imagenesBase64 = [];
        },
        error: (error) => {
          console.error('Error al crear el evento:', error);
          // Puedes mostrar una alerta o mensaje visual aquí
        },
      });
    } else {
      console.log('Formulario inválido');
      this.eventoForm.markAllAsTouched();
    }
  }
}
