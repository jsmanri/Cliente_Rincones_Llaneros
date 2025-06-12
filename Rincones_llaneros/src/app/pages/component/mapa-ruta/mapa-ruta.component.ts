import { Component, ElementRef, EventEmitter, Output, ViewChild, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-mapa-ruta',
  imports: [
    CommonModule,
    GoogleMapsModule,
    MatButtonModule,

  ],
  templateUrl: './mapa-ruta.component.html',
  styleUrl: './mapa-ruta.component.css'
})
export class MapaRutaComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @Output() ubicacionUsuario = new EventEmitter<{ lat: number; lng: number }>();

  sitioUbicacion!: { lat: number; lng: number };
  usuarioUbicacion!: { lat: number; lng: number };
  mapa!: any;
  directionsService!: any;
  directionsRenderer!: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { sitioUbicacion: { lat: number; lng: number } }) {
    this.sitioUbicacion = data.sitioUbicacion; // Recibe la ubicación del sitio desde el modal
  }

  ngOnInit(): void {
    console.log('Ubicación del sitio recibida:', this.sitioUbicacion);
    this.obtenerUbicacionUsuario();
  }

  obtenerUbicacionUsuario() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.usuarioUbicacion = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          console.log('Ubicación del usuario obtenida:', this.usuarioUbicacion);

          if (this.sitioUbicacion) {
            this.inicializarMapa();
          } else {
            console.error('Ubicación del sitio no definida.');
          }
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso.');
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización.');
    }
  }

  inicializarMapa() {
    if (!this.usuarioUbicacion || !this.sitioUbicacion) {
      console.error('Ubicación del usuario o del sitio no definida correctamente.');
      return;
    }

    this.mapa = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.sitioUbicacion,
      zoom: 14
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.mapa);

    this.generarRuta();
  }

  generarRuta() {
  if (!this.usuarioUbicacion || !this.sitioUbicacion) {
    console.error('Ubicación del usuario o del sitio no definida correctamente.');
    return;
  }

  console.log('Generando ruta desde:', this.usuarioUbicacion, 'hasta:', this.sitioUbicacion);

  const request = {
    origin: { lat: this.usuarioUbicacion.lat, lng: this.usuarioUbicacion.lng },
    destination: { lat: this.sitioUbicacion.lat, lng: this.sitioUbicacion.lng },
    travelMode: google.maps.TravelMode.DRIVING // Puedes probar con WALKING o BICYCLING si es necesario
  };

  this.directionsService.route(request, (result: any, status: any) => {
    if (status === google.maps.DirectionsStatus.OK) {
      this.directionsRenderer.setDirections(result);
    } else {
      console.error('Error generando ruta:', status);
      if (status === 'ZERO_RESULTS') {
        alert('No se encontró una ruta válida entre tu ubicación y el sitio.');
      }
    }
  });
}

}