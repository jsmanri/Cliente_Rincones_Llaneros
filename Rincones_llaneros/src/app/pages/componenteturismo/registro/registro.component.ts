import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';

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
    GoogleMapsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  sitioForm: FormGroup;
  mostrarModal = false;
  politicasAceptadas = false;
  registroExitoso = false;
  mostrarMapa = false;

  imagenesPreview: string[] = [];

  center: google.maps.LatLngLiteral = { lat: 5.354, lng: -72.395 };
  zoom = 8;
  markerPosition: google.maps.LatLngLiteral | null = null;

  municipios = [
    { nombre: 'Yopal', lat: 5.3478, lng: -72.4064 },
    { nombre: 'Aguazul', lat: 5.1726, lng: -72.5479 },
    { nombre: 'Villanueva', lat: 4.5994, lng: -72.9711 },
    { nombre: 'Monterrey', lat: 4.8837, lng: -73.0535 },
  ];

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  constructor(private fb: FormBuilder) {
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
    this.markerPosition = null;

    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  abrirMapa(): void {
    this.mostrarMapa = true;
  }

  seleccionarMunicipio(lat: number, lng: number, nombre: string): void {
    this.center = { lat, lng };
    this.zoom = 13;
    this.markerPosition = { lat, lng };

    this.sitioForm.patchValue({
      latitud: lat,
      longitud: lng
    });

    alert(`Municipio seleccionado: ${nombre}`);
    this.mostrarMapa = true;
  }

  marcarUbicacion(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.markerPosition = { lat, lng };

      this.sitioForm.patchValue({
        latitud: lat,
        longitud: lng
      });
    }
  }
}
