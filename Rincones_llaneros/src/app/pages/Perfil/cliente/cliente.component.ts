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
    const idCliente = 3;

    this.servicio.obtenerClientePorId(idCliente).subscribe({
      next: (cliente) => {
        console.log('Cliente con id 3:', cliente);
        if (cliente) {

          // 🔁 Asegurarse de parsear la imagen si viene como string
          if (cliente.FotoPerfil && typeof cliente.FotoPerfil === 'string') {
            try {
              cliente.FotoPerfil = JSON.parse(cliente.FotoPerfil);
            } catch {
              cliente.FotoPerfil = null; // No foto por defecto
            }
          }

          this.usuario = {
            nombre: cliente.Nombre,
            rol: { nombre: 'cliente' },
            correo: cliente.Correo,
            cedula: cliente.Cedula,
            numeroTelefono: cliente.NumeroTelefono,
            fotoPerfil: cliente.FotoPerfil || null,
            fotoPreview: cliente.FotoPerfil?.url || null,
            activo: cliente.Activo,
            idCredencialesCredenciales: {
              id: cliente.IdCredencialesCredenciales?.Id || null,
              usuario: cliente.IdCredencialesCredenciales?.Usuario || ''
            }
          };
        }
      },
      error: (err) => {
        console.error('Error al obtener cliente:', err);
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
