import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

export interface Sitio {
  Cantidad_comentarios: number;
  Descripcion: string;
  Fotositio: string;
  Nombre: string;
  Ponderacion: number;
}

export interface TendenciasResponse {
  message: string;
  resultado: Sitio[];
  status: number;
}

@Component({
  selector: 'app-tendencias',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {
  sitiosAMostrar = 10;
  sitios: any[] = [];

  constructor(private apiService: ApiService) {}

ngOnInit(): void {
  this.apiService.get<TendenciasResponse>('http://localhost:8085/v1/Tendencias').subscribe({
    next: (response) => {
      this.sitios = response.resultado.map(sitio => {
        // Intenta parsear el string JSON
        let imagen = '';
        try {
          const fotoObj = JSON.parse(sitio.Fotositio);
          imagen = fotoObj.imagen_base64
            ? `data:image/png;base64,${fotoObj.imagen_base64}`
            : 'assets/default.png'; // Imagen por defecto si no hay base64
        } catch (e) {
          console.warn('Error al parsear la imagen:', sitio.Fotositio);
          imagen = 'assets/default.png';
        }

        return {
          nombre: sitio.Nombre,
          descripcion: sitio.Descripcion,
          imagen: imagen,
          valoracion: Math.round(sitio.Ponderacion * 10) / 10,
          comentarios: sitio.Cantidad_comentarios
        };
      });
    },
    error: (err) => {
      console.error('Error al cargar tendencias:', err);
    }
  });
}

  // Obtener las estrellas según la valoración
  getEstrellasArray(puntaje: number): string[] {
    const estrellas = [];
    const llenas = Math.floor(puntaje);
    const media = puntaje % 1 >= 0.5;

    for (let i = 0; i < llenas; i++) {
      estrellas.push('star');
    }

    if (media) estrellas.push('star_half');

    while (estrellas.length < 5) {
      estrellas.push('star_border');
    }

    return estrellas;
  }

  // Obtener los sitios que deben mostrarse en base a la variable 'sitiosAMostrar'
  getSitiosAMostrar() {
    return this.sitios.slice(0, this.sitiosAMostrar);
  }
}
