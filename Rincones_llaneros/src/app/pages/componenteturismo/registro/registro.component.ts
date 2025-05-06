import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MapaComponent } from '../mapa/mapa.component';

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
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  sitioForm: FormGroup;
  mostrarModal = false;
  politicasAceptadas = false;
  registroExitoso = false;
  imagenesPreview: string[] = [];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.sitioForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      horario: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagenes: [null],
      latitud: [''],
      longitud: ['']
    });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newPreviews: string[] = [...this.imagenesPreview];
      const currentFiles: File[] = this.sitioForm.get('imagenes')?.value ?? [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: any) => {
          newPreviews.push(e.target.result);
          if (i === files.length - 1) {
            this.imagenesPreview = newPreviews;
          }
        };

        reader.readAsDataURL(file);
        currentFiles.push(file);
      }

      this.sitioForm.patchValue({ imagenes: currentFiles });
      this.sitioForm.get('imagenes')?.updateValueAndValidity();
    }
  }

  eliminarImagen(index: number): void {
    this.imagenesPreview.splice(index, 1);
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
      console.log('Datos del sitio:', this.sitioForm.value);
      this.registroExitoso = true;
      this.resetFormulario();
      setTimeout(() => this.registroExitoso = false, 5000);
    }
  }

  resetFormulario(): void {
    this.sitioForm.reset();
    this.imagenesPreview = [];
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
