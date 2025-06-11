import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-maparecorrido',
  imports: [
    CommonModule,
    MatButtonModule,
    GoogleMapsModule
  ],
  templateUrl: './maparecorrido.component.html',
  styleUrl: './maparecorrido.component.css'
})
export class MaparecorridoComponent implements OnInit {
  
  zoom = 14;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  miUbicacion: google.maps.LatLngLiteral | null = null;
  sitioUbicacion: google.maps.LatLngLiteral = { lat: 5.3510, lng: -72.3950 }; // Ejemplo: sitio fijo
  directions: google.maps.DirectionsResult | null = null;

  ngOnInit(): void {
    this.obtenerMiUbicacion();
  }

  // Obtener la ubicación del usuario
  obtenerMiUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.miUbicacion = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.center = this.miUbicacion;
      }, (error) => {
        console.error('Error al obtener la ubicación', error);
      });
    } else {
      console.warn('Geolocalización no soportada');
    }
  }

  // Trazar ruta desde mi ubicación al sitio
  trazarRuta(): void {
    if (!this.miUbicacion || !this.sitioUbicacion) return;

    const directionsService = new google.maps.DirectionsService();

    directionsService.route(
      {
        origin: this.miUbicacion,
        destination: this.sitioUbicacion,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === 'OK' && result) {
          this.directions = result;
        } else {
          console.error('Error al obtener la ruta', status);
        }
      }
    );
  }
}

