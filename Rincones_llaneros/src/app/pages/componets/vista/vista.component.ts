import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista',
  imports: [
    CommonModule
  ],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {
  constructor(private router:Router){}
  
  goToPush(){
    this.router.navigate(['headersinregistro/vista2']);
  }

  
  
   // Array de imágenes para el carrusel
   images = [
    {
      src: '/atardecer.jpg',
      title: 'Atardecer increíble',
      description: 'Disfruta de un paisaje inolvidable'
    },
    {
      src: '/Casanare-3.jpg',
      title: 'Naturaleza viva',
      description: 'Explora la belleza de Casanare'
    },
    {
      src: '/comida.jpg',
      title: 'Delicias locales',
      description: 'Sabores auténticos de la región'
    },
    {
      src: '/elemento.jpg',
      title: 'Aventura',
      description: 'Emoción garantizada para todos'
    }
  ];

  currentIndex: number = 0;

  // Función para mover al siguiente elemento
  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Función para mover al anterior elemento
  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}

