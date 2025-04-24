import { Component } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';

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
    FormsModule
  ],
  templateUrl: './tendencias.component.html',
  styleUrls: ['./tendencias.component.css']
})
export class TendenciasComponent {
  // Número de sitios que se deben mostrar
  sitiosAMostrar = 10;  // Cambia este valor para ver más o menos sitios

  sitios = [
    {
      nombre: 'Estadero Y',
      descripcion: 'Lugar para comer la mejor carne al horno y conocer a yashido.',
      imagen: 'loginimagen.jpg',
      valoracion: 4.5,
      comentarios: 32
    },
    {
      nombre: 'Cascada La Linda',
      descripcion: 'Una vista mágica con senderos naturales.',
      imagen: 'loginimagen.jpg',
      valoracion: 3.5,
      comentarios: 14
    },
    {
      nombre: 'Parque del Sol',
      descripcion: 'Ideal para hacer picnic y disfrutar el atardecer.',
      imagen: 'loginimagen.jpg',
      valoracion: 5,
      comentarios: 45
    },
    {
      nombre: 'Museo Histórico Regional',
      descripcion: 'Conoce la historia local en un solo lugar.',
      imagen: 'loginimagen.jpg',
      valoracion: 2.5,
      comentarios: 6
    },
    {
      nombre: 'Mirador del Águila',
      descripcion: 'Perfecto para ver toda la ciudad desde las alturas.',
      imagen: 'loginimagen.jpg',
      valoracion: 4.0,
      comentarios: 27
    },
    {
      nombre: 'EcoRuta Aventura',
      descripcion: 'Caminatas guiadas, tirolesa y naturaleza pura.',
      imagen: 'loginimagen.jpg',
      valoracion: 4.2,
      comentarios: 18
    },
    {
      nombre: 'Sendero Encantado',
      descripcion: 'Una experiencia mágica para toda la familia.',
      imagen: 'loginimagen.jpg',
      valoracion: 3.8,
      comentarios: 10
    },
    {
      nombre: 'Café Colonial',
      descripcion: 'El mejor café artesanal con ambiente vintage.',
      imagen: 'loginimagen.jpg',
      valoracion: 4.7,
      comentarios: 29
    },
    {
      nombre: 'Bahía Serena',
      descripcion: 'Playas tranquilas, arena blanca y aguas cristalinas.',
      imagen: 'loginimagen.jpg',
      valoracion: 5,
      comentarios: 51
    }
  ];

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
