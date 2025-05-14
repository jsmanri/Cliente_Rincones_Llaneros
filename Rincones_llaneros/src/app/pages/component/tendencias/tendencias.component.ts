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
        // Procesa el campo Fotositio, que parece ser un string escapado
        let imagen = 'default.png'; // Imagen predeterminada en caso de error

        try {
          // Primero, parsea la cadena escapada
          const fotosArray = JSON.parse(JSON.parse(sitio.Fotositio));
          
          // Verifica si es un array y si tiene imágenes
          if (Array.isArray(fotosArray) && fotosArray.length > 0) {
            imagen = fotosArray[0]; // Usa la primera imagen
          }
        } catch (e) {
          console.warn('Error al parsear Fotositio:', sitio.Fotositio);
        }


        // Devuelve un objeto con los datos procesados
        return {
          nombre: sitio.Nombre,
          descripcion: sitio.Descripcion,
          imagen: imagen,
          valoracion: Math.round(sitio.Ponderacion * 10) / 10,
          comentarios: sitio.Cantidad_comentarios
        };
      })
      .sort((a, b) => b.valoracion - a.valoracion);
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