import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // también lo necesitarás


@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [CommonModule, FormsModule],  // 👈 Aquí importa CommonModule
})
export class RegistroSitioComponent implements AfterViewInit {
  ubicacion: string = '';
  direccion: string = '';
  descripcion: string = '';
  nombreSitio: string = '';
  horario: string = '';
  fotos: any;
  mostrarMapa: boolean = false;
  municipioSeleccionado: string = '';
  municipiosCasanare = [
    { nombre: 'Yopal', lat: 5.33775, lng: -72.39586 },
    { nombre: 'Aguazul', lat: 5.17321, lng: -72.5525 },
    { nombre: 'Villanueva', lat: 4.61504, lng: -72.927 },
    { nombre: 'Monterrey', lat: 4.88347, lng: -73.0 },
    { nombre: 'Tauramena', lat: 5.01717, lng: -72.7482 },
    { nombre: 'Maní', lat: 4.82127, lng: -72.8804 },
    { nombre: 'Paz de Ariporo', lat: 5.8761, lng: -71.8896 },
    { nombre: 'Hato Corozal', lat: 6.1546, lng: -71.7886 },
    { nombre: 'Pore', lat: 6.0089, lng: -71.9603 },
    { nombre: 'Trinidad', lat: 5.4233, lng: -71.6611 },
    { nombre: 'San Luis de Palenque', lat: 6.3979, lng: -71.7308 },
    { nombre: 'Nunchía', lat: 5.6406, lng: -72.2027 },
    { nombre: 'Orocué', lat: 4.7907, lng: -71.3399 },
    { nombre: 'Recetor', lat: 5.3166, lng: -72.6814 },
    { nombre: 'Sabanalarga', lat: 4.8549, lng: -73.0343 },
    { nombre: 'Chámeza', lat: 5.1953, lng: -72.8723 },
    { nombre: 'La Salina', lat: 6.3173, lng: -72.1954 },
    { nombre: 'Sacama', lat: 6.4163, lng: -72.1692 },
    { nombre: 'Támara', lat: 5.8339, lng: -72.1624 }
  ];

  private map: any;
  private marker: any;

  abrirMapa() {
    if (!this.municipioSeleccionado) {
      alert("Por favor selecciona un municipio primero.");
      return;
    }

    this.mostrarMapa = true;

    setTimeout(() => {
      const municipio = this.municipiosCasanare.find(m => m.nombre === this.municipioSeleccionado);

      if (!this.map) {
        this.map = L.map('map').setView([municipio!.lat, municipio!.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        this.map.on('click', (e: any) => {
          const lat = e.latlng.lat.toFixed(6);
          const lng = e.latlng.lng.toFixed(6);
          this.ubicacion = `${lat}, ${lng}`;

          if (this.marker) {
            this.marker.setLatLng(e.latlng);
          } else {
            this.marker = L.marker(e.latlng).addTo(this.map);
          }
        });
      } else {
        this.map.setView([municipio!.lat, municipio!.lng], 13);
      }
    }, 100);
  }

  cerrarMapa() {
    this.mostrarMapa = false;
  }

  ngAfterViewInit(): void {}
}
