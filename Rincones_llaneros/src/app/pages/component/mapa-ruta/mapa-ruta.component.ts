import { Component, ElementRef, EventEmitter, Output, ViewChild, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';


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
  @Input() sitioUbicacion!: { lat: number; lng: number };
  @Output() ubicacionUsuario = new EventEmitter<{ lat: number; lng: number }>();

  mapa!: any;
  directionsService!: any;
  directionsRenderer!: any;
  usuarioUbicacion!: { lat: number; lng: number };

  ngOnInit(): void {
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
          this.ubicacionUsuario.emit(this.usuarioUbicacion);
          this.inicializarMapa();
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
    const request = {
      origin: this.usuarioUbicacion,
      destination: this.sitioUbicacion,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error generando ruta:', status);
      }
    });
  }
}
