import { Component, ElementRef, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [
    CommonModule,
    GoogleMapsModule
  ],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  zoom = 12;
  center: google.maps.LatLngLiteral = { lat: 5.3505, lng: -72.3957 };
  map!: google.maps.Map;
  marker!: google.maps.Marker;
  markerPosition: google.maps.LatLngLiteral | null = null;

  @Output() ubicacionSeleccionada = new EventEmitter<{
    latitud: number;
    longitud: number;
  }>();

  ngOnInit(): void {
    // Vincula la función initMap al contexto global
    (window as any).initMap = this.initMap.bind(this);
  }

  // Función initMap que inicializa el mapa
  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: this.center,
      zoom: this.zoom,
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    // Configura el evento `click` en el mapa
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      this.marcarUbicacion(event);
    });
  }

  // Método para manejar el clic en el mapa
  marcarUbicacion(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };

      // Si ya existe un marcador, actualiza su posición
      if (this.marker) {
        this.marker.setPosition(this.markerPosition);
      } else {
        // Crea un marcador en la posición seleccionada
        this.marker = new google.maps.Marker({
          position: this.markerPosition,
          map: this.map
        });
      }
    }
  }

  // Método para confirmar la ubicación seleccionada
  confirmarUbicacion(): void {
    if (this.markerPosition) {
      this.ubicacionSeleccionada.emit({
        latitud: this.markerPosition.lat,
        longitud: this.markerPosition.lng
      });
    }
  }
}