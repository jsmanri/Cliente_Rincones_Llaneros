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
import { Router } from '@angular/router';
import { API_URLS } from '../../../../config/api-config';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface Sitio {
  Id_Sitio: number;
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
    HttpClientModule,
    MatProgressSpinnerModule // Importa el módulo del spinner
  ],
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent implements OnInit {
  sitiosAMostrar = 10;
  sitios: any[] = [];
  cargando = true; // Variable para controlar el estado de carga

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.apiService.get<TendenciasResponse>(API_URLS.Mid.Api_midtendencias).subscribe({
      next: (response) => {
        this.sitios = response.resultado.map(sitio => {
          let imagen = 'assets/default.png'; // Imagen por defecto
          try {
            const contenido = sitio.Fotositio?.trim();
            let fotos: string[] = [];
            if (contenido?.startsWith('"[')) {
              fotos = JSON.parse(JSON.parse(contenido));
            } else if (contenido?.startsWith('[')) {
              fotos = JSON.parse(contenido);
            } else if (contenido?.startsWith('data:image')) {
              fotos = [contenido];
            }
            if (fotos.length > 0 && fotos[0].trim() !== '') {
              imagen = fotos[0];
            }
          } catch (error) {}

          return {
            id: sitio.Id_Sitio,
            nombre: sitio.Nombre,
            descripcion: sitio.Descripcion,
            imagen: imagen,
            valoracion: Math.round(sitio.Ponderacion * 10) / 10,
            comentarios: sitio.Cantidad_comentarios
          };
        }).sort((a, b) => b.valoracion - a.valoracion);

        this.cargando = false; // Oculta el spinner cuando la petición se completa
      },
      error: (err) => {
        console.error('Error al cargar tendencias:', err);
        this.cargando = false; // Oculta el spinner en caso de error
      }
    });
  }

  expandirDescripcion(sitio: any): void {
    sitio.descripcionExpandida = !sitio.descripcionExpandida;
  }

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

  getSitiosAMostrar() {
    return this.sitios.slice(0, this.sitiosAMostrar);
  }

  verDetalle(id: string | number): void {
    this.router.navigate(['/info-sitio', id]);
  }
}
