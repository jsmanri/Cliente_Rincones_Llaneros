import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  sitioForm: FormGroup;
  mostrarModal: boolean = false;
  politicasAceptadas: boolean = false;
  registroExitoso: boolean = false;

  constructor(private fb: FormBuilder) {
    // Inicialización del formulario reactivo
    this.sitioForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      horario: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagenes: [null]  // este campo no es visible, solo lo manejamos con lógica
    });
  }


  imagenesPreview: string[] = [];

  // Maneja los archivos seleccionados
  onFileSelected(event: any): void {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      // Limpiar vistas previas existentes
      this.imagenesPreview = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
          this.imagenesPreview.push(e.target.result); // Eliminamos la verificación de duplicados
        };
        
        reader.readAsDataURL(file);
      }
  
      // Actualizar el FormGroup con los nuevos archivos
      this.sitioForm.patchValue({
        imagenes: files // Usamos directamente FileList
      });
      this.sitioForm.get('imagenes')?.updateValueAndValidity();
    }
  }

  eliminarImagen(index: number): void {
    // Eliminar la imagen de la vista previa
    this.imagenesPreview.splice(index, 1);
  
    // Actualizar los archivos seleccionados en el FormGroup
    const updatedFiles = this.sitioForm.get('imagenes')?.value || [];
    updatedFiles.splice(index, 1); // Eliminar también del FormGroup
  
    this.sitioForm.patchValue({
      imagenes: updatedFiles
    });
    this.sitioForm.get('imagenes')?.updateValueAndValidity();
  }



  // Abre el modal de políticas
  abrirModal(): void {
    if (this.sitioForm.valid) {
      this.mostrarModal = true;
    } else {
      this.sitioForm.markAllAsTouched(); // marca todos los campos como "tocados" para mostrar errores si hay
    }
  }

  // Acepta las políticas y registra el sitio
  aceptarPoliticas(): void {
    this.politicasAceptadas = true;
    this.mostrarModal = false;

    this.registrarSitio(); // solo se ejecuta si se aceptaron las políticas
  }

  // Registra el sitio (simulado)
  registrarSitio(): void {
    if (this.sitioForm.valid && this.politicasAceptadas) {
      console.log('Datos del sitio:', this.sitioForm.value);
      
      // Mostrar mensaje de éxito
      this.registroExitoso = true;
  
      // Limpiar formulario COMPLETO (incluyendo imágenes)
      this.resetFormulario();
  
      // Ocultar mensaje después de unos segundos
      setTimeout(() => {
        this.registroExitoso = false;
      }, 5000);
    }
  }

  resetFormulario(): void {
    this.sitioForm.reset();
    this.imagenesPreview = []; // Vaciar las vistas previas
    this.politicasAceptadas = false;
    
    // Resetear específicamente el input de archivos
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Esto permite volver a seleccionar las mismas imágenes
    }
  }



}
