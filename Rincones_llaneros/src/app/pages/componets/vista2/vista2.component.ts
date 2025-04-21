import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista2',
  imports: [
    CommonModule
  ],
  templateUrl: './vista2.component.html',
  styleUrl: './vista2.component.css'
})
export class Vista2Component {
  images: string[] = [
    '/atardecer.jpg',
    '/Casanare-3.jpg',
    '/comida.jpg',
    '/elemento.jpg'
  ];

  currentIndex: number = 0;

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // Función para mover al anterior elemento
  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
}
