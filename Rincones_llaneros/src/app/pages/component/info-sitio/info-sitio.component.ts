import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-info-sitio',
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
  templateUrl: './info-sitio.component.html',
  styleUrl: './info-sitio.component.css'
})
export class InfoSitioComponent implements OnInit, OnDestroy {
  sitio: any;
  imagenActual: number = 0;
  intervaloCarrusel: any;
  imagenSeleccionada: string = '';
   modalVisible: boolean = false;



  ngOnInit(): void {
    this.sitio = {
      NombreSitioTuristico: 'Garcero del llano reserva natural',
      FotoPrincipal: 'rio2.jpg',
      valoracion: 3.5,
      horario: '6:00am - 10:00pm',
      telefono: '3001234567',
      lat: 5.389474042082158,
      lng: -72.31996782627014,
      transporte: {
        recomendacion: 'Recomendaciones de transporte'
      },
      imagenes: [
        'comida.jpg',
        'llanos.jpg',
        'atardecer.jpg',
        'Casanare-3.jpg',
        'comida2.jpg',
      ],
      comentarios: [
        {
          autor: 'Yasith Salcedo',
          valoracion: 2,
          texto: 'Un lugar donde se respira vida, muy cerca a la capital del llano Yopal...'
        },
        {
          autor: 'Carlos Pérez',
          valoracion: 4,
          texto: 'Ideal para avistamiento de aves. Muy tranquilo y bien organizado.'
        },
        {
          autor: 'Ana Gómez',
          valoracion: 2.5,
          texto: 'Bonito lugar pero algo difícil de llegar sin guía.'
        }
      ]
    };

    this.iniciarCarruselAutomatico();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervaloCarrusel);
  }

  iniciarCarruselAutomatico(): void {
    this.intervaloCarrusel = setInterval(() => {
      this.siguienteImagen();
    }, 4000);
  }

  anteriorImagen() {
    if (this.sitio?.imagenes?.length > 0) {
      this.imagenActual =
        (this.imagenActual - 1 + this.sitio.imagenes.length) % this.sitio.imagenes.length;
    }
  }

  siguienteImagen() {
    if (this.sitio?.imagenes?.length > 0) {
      this.imagenActual =
        (this.imagenActual + 1) % this.sitio.imagenes.length;
    }
  }

  getEstrellasArray(valoracion: number): string[] {
    const estrellas: string[] = [];
    const enteras = Math.floor(valoracion);
    const decimal = valoracion - enteras;

    for (let i = 0; i < enteras; i++) {
      estrellas.push('star');
    }

    if (decimal >= 0.25 && decimal < 0.75) {
      estrellas.push('star_half');
    } else if (decimal >= 0.75) {
      estrellas.push('star');
    }

    while (estrellas.length < 5) {
      estrellas.push('star_border');
    }

    return estrellas;
  }

  abrirImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
    this.modalVisible = true;
    clearInterval(this.intervaloCarrusel); // Detener carrusel
  }

  cerrarModal() {
    this.modalVisible = false;
    this.iniciarCarruselAutomatico(); // Reanudar carrusel
  }
}