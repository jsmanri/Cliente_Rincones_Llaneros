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
    this.router.navigate(['/vista2'])
  }

  
  
   // Array de imágenes para el carrusel
   images: string[] = [
    '/atardecer.jpg',
    '/Casanare-3.jpg',
    '/comida.jpg',
    '/elemento.jpg'
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

