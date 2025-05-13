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
    MatFormFieldModule,
    FormsModule,
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
    this.apiService.get<TendenciasResponse>('http://localhost:8085/v1/Tendencias')
      .subscribe(response => {
        if (response.status === 200) {
          this.sitios = response.resultado.map((sitio) => {
            let imagen = 'loginimagen.jpg';
            try {
              const parsed = JSON.parse(sitio.Fotositio);
              imagen = `data:image/png;base64,${parsed.imagen_base64}`;
            } catch (e) {
              console.error('Error parsing image base64:', e);
            }

            return {
              nombre: sitio.Nombre,
              descripcion: sitio.Descripcion,
              imagen: imagen,
              valoracion: sitio.Ponderacion,
              comentarios: sitio.Cantidad_comentarios
            };
          });
        }
      }, error => {
        console.error('Error al obtener tendencias:', error);
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
