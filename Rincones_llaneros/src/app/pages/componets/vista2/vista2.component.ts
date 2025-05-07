import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-vista2',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './vista2.component.html',
  styleUrl: './vista2.component.css'
})
export class Vista2Component {constructor(private router:Router){}

goToPushCaballo() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'caballo' } });
}

goToPushRestaurantes() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'restaurantes' } });
}

goToPushMuseos() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'museos' } });
}

goToPushMonumentos() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'monumentos' } });
}

goToPushCaminata() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'caminata' } });
}

goToPushSafari() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'safari' } });
}

goToPushHoteles() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'Hoteles' } });
}
goToPushPiscinas() {
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'Piscinas' } });
}



  scrollTo(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

}
