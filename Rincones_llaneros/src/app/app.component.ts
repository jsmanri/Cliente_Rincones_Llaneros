import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { AccessControlService } from '../services/access-control.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'Rincones llaneros';
  usuarioAutenticado: boolean = false;

  constructor(private router: Router, private accessControl: AccessControlService) {}

  ngOnInit() {
    const rutaActual = this.router.url; // 🔹 Obtener la ruta actual
    if (!this.accessControl.puedeAcceder(rutaActual)) {
      this.router.navigate(['/login']); // 🔹 Redirigir si no tiene acceso
    }
  }

  logout() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('id_rol');
    this.router.navigate(['/login']);
  }
}
