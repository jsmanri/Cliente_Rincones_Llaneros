import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessControlService {

  private rutasPorRol: { [key: number]: string[] } = {
    1: ['/usuadmin'], // 🔹 Admin solo accede a usuarios admin
    2: ['/home', '/buscar', '/tendencias', '/cliente', '/info-sitio'], // 🔹 Cliente
    3: ['/home', '/buscar', '/tendencias', '/info-sitio', '/registroevento', '/registrositio', '/vendedor'] // 🔹 Vendedor
  };

  constructor() {}

  // 🔹 Verificar si el usuario tiene acceso a la ruta
  puedeAcceder(ruta: string): boolean {
    const idRol = Number(localStorage.getItem('id_rol'));
    return this.rutasPorRol[idRol]?.includes(ruta) || false;
  }
}
