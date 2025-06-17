import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../../services/api.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  editando = false;

  usuario: any = {
    nombre: '',
    rol: { nombre: 'cliente' },
    correo: '',
    cedula: '',
    numeroTelefono: '',
    fotoPerfil: null,
    fotoPreview: null,
    activo: true,
    idCredencialesCredenciales: { usuario: '' }
  };

  constructor(private servicio: ClienteService) {}

ngOnInit(): void {
  // 🔹 Obtener el ID del usuario y asegurarse de que es un número
  const idUsuario = Number(localStorage.getItem('usuarioId'));

  if (!idUsuario) {
    console.error('No se encontró un ID válido en localStorage.');
    return;
  }

  // 🔹 Buscar el usuario según el ID obtenido
  this.servicio.obtenerClientePorId(idUsuario).subscribe({
    next: (usuario) => {
      if (usuario) {
        // 🔁 Asegurar que la imagen de perfil se parsea si viene como string
        if (usuario.FotoPerfil && typeof usuario.FotoPerfil === 'string') {
          try {
            usuario.FotoPerfil = JSON.parse(usuario.FotoPerfil);
          } catch {
            usuario.FotoPerfil = 'assets/profile.png'; // 🔹 Imagen por defecto en caso de error
          }
        }

        // 🔹 Asignar los datos al objeto `usuario`
        this.usuario = {
          nombre: usuario.Nombre,
          rol: { nombre: 'cliente' },
          correo: usuario.Correo,
          cedula: usuario.Cedula,
          numeroTelefono: usuario.NumeroTelefono,
          fotoPerfil: usuario.FotoPerfil || 'assets/profile.png',
          fotoPreview: usuario.FotoPerfil?.url || null,
          activo: usuario.Activo,
          idCredencialesCredenciales: {
            id: usuario.IdCredencialesCredenciales?.Id || null,
            usuario: usuario.IdCredencialesCredenciales?.Usuario || ''
          }
        };
      }
    },
    error: (err) => {
      console.error('Error al obtener los datos del usuario:', err);
    }
  });
}

  cambiarFoto(event: any) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  // 🔁 Resetear primero
  this.usuario.fotoPerfil = '';
  this.usuario.fotoPreview = '';

  const lector = new FileReader();

  lector.onload = () => {
    const dataUrl = lector.result as string;

    // ✅ Guardar la nueva imagen, reemplazando la anterior
    this.usuario.fotoPerfil = dataUrl.trim();
    this.usuario.fotoPreview = dataUrl;
  };

  lector.readAsDataURL(archivo);
  event.target.value = null;
}



  guardarCambios() {
    const idCliente = 3; // Debe venir dinámicamente idealmente
    const idCredencial = this.usuario.idCredencialesCredenciales?.id || 2;

    const datosActualizados = {
      Id: idCliente,
      Nombre: this.usuario.nombre.trim(),
      Correo: this.usuario.correo.trim(),
      Cedula: this.usuario.cedula.trim(),
      NumeroTelefono: this.usuario.numeroTelefono.trim(),
      Activo: this.usuario.activo,
      Rol: { Id: 2 },
      FotoPerfil: JSON.stringify([this.usuario.fotoPerfil]), // 👈 nota los []// 🔥 Aquí convertimos a string
      IdCredencialesCredenciales: {
        Id: idCredencial,
        Usuario: this.usuario.idCredencialesCredenciales.usuario.trim()
      }
    };

    this.servicio.actualizarCliente(idCliente, datosActualizados).subscribe({
      next: (respuesta) => {
        console.log('Cliente actualizado correctamente:', respuesta);
        this.editando = false;
      },
      error: (error) => {
        console.error('Error al actualizar cliente:', error);
      }
    });
  }

}
