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
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../../../services/api.service';
import { API_URLS } from '../../../../config/api-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headerregistro',
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
  templateUrl: './headerregistro.component.html',
  styleUrl: './headerregistro.component.css'
})
export class HeaderregistroComponent implements OnInit {
  usuario: any = {
    nombre: '',
    fotoPerfil: 'profile.png' // 🔹 Imagen por defecto
  };
  usuarioId: string | null = null; // 🔹 Definir usuarioId
  usuarioAutenticado: boolean = false;
  usuarioRol: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.verificarSesion();
  }

verificarSesion() {
  this.usuarioId = localStorage.getItem('usuarioId'); // 🔹 Guardar el ID del usuario
  this.usuarioRol = localStorage.getItem('usuarioRol'); 

  if (this.usuarioId) {
    this.usuarioAutenticado = true;
    this.obtenerDatosUsuario(this.usuarioId);
  }
}


 obtenerDatosUsuario(idUsuario: string) {
  this.apiService.get<any>(`${API_URLS.CRUD.Api_crudUsuarios}/${idUsuario}`).subscribe({
    next: (usuario) => {
      console.log('Usuario recibido:', usuario);

      if (usuario) {
        this.usuario = {
          nombre: usuario.Nombre,
          fotoPerfil: 'profile.png' // 🔹 Imagen por defecto
        };

        // 🔁 Asegurar que la imagen de perfil se parsea si viene como string
        if (usuario.FotoPerfil && typeof usuario.FotoPerfil === 'string') {
          try {
            usuario.FotoPerfil = JSON.parse(usuario.FotoPerfil);
          } catch {
            usuario.FotoPerfil = 'profile.png'; // 🔹 Imagen por defecto en caso de error
          }
        }

        // 🔹 Asegurar que la imagen tenga el encabezado correcto
        this.usuario.fotoPerfil = usuario.FotoPerfil
          ? usuario.FotoPerfil.startsWith('data:image')
            ? usuario.FotoPerfil
            : `data:image/jpeg;base64,${usuario.FotoPerfil}`
          : 'profile.png';
      }
    },
    error: (err) => {
      console.error('Error al obtener los datos del usuario:', err);
    }
  });
}



  logout() {
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioRol'); // 🔹 También eliminar el rol del usuario
    this.usuarioAutenticado = false;
    console.log('Sesión cerrada');
    this.router.navigate(['/login']);
  }

  verPerfil() {
    const usuarioId = localStorage.getItem('usuarioId');
    const usuarioRol = localStorage.getItem('usuarioRol');

    if (!usuarioId || !usuarioRol) {
      this.router.navigate(['/login']); // Redirigir al login si no hay sesión activa
      return;
    }

    switch (usuarioRol) {
      case '1': // Vendedor
        this.router.navigate([`/home/vendedor/${usuarioId}`]);
        break;
      case '2': // Cliente
        this.router.navigate([`/home/cliente/${usuarioId}`]);
        break;
      case '3': // Administrador
        this.router.navigate(['/usuadmin']);
        break;
      default:
        this.router.navigate(['/home']);
    }
  }

  puedeMostrarVista(vista: string): boolean {
    if (!this.usuarioRol) return false;

    switch (this.usuarioRol) {
      case '1': // Vendedor
        return ['/home', '/home/vendedor', '/home/registroevento', '/home/eventos', '/home/buscar', '/home/tendencias'].includes(vista);
      case '2': // Cliente
        return ['/home', '/home/tendencias', '/home/buscar', '/home/cliente'].includes(vista);
      case '3': // Administrador
        return ['/usuadmin'].includes(vista);
      default:
        return ['/home'].includes(vista);
    }
  }
}
