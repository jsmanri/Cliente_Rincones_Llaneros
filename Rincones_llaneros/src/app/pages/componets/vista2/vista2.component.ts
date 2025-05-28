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
  /*window para comenzar desde arriba del todo */
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'caballo' } });
}

goToPushRestaurantes() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'restaurantes' } });
}

goToPushMuseos() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'museos' } });
}

goToPushMonumentos() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'monumentos' } });
}

goToPushCaminata() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'caminata' } });
}

goToPushSafari() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'safari' } });
}

goToPushHoteles() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'Hoteles' } });
}
goToPushPiscinas() {
   window.scrollTo(0, 0);
  this.router.navigate(['/detalles'], { queryParams: { actividad: 'Piscinas' } });
}

goToPushEventos() {
   window.scrollTo(0, 0);
  this.router.navigate(['/eventos'], { queryParams: { actividad: 'Piscinas' } });
}



  scrollTo(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

}
