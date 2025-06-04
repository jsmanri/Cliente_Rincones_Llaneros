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
    fotoPerfil: '',
    activo: true,
    idCredencialesCredenciales: { usuario: '' }
  };

  constructor(private servicio: ClienteService) {}

  ngOnInit(): void {
    const idCliente = 4; // Reemplaza con el ID real, posiblemente desde login o token

    this.servicio.obtenerClientePorId(idCliente).subscribe({
      next: (cliente) => {
        console.log('Cliente con id 3:', cliente);
        if (cliente) {
          this.usuario = {
            nombre: cliente.Nombre,
            rol: { nombre: 'cliente' },
            correo: cliente.Correo,
            cedula: cliente.Cedula,
            numeroTelefono: cliente.NumeroTelefono,
            fotoPerfil: cliente.FotoPerfil?.url || 'https://i.pravatar.cc/150?img=5',
            activo: cliente.Activo,
            idCredencialesCredenciales: {
              usuario: cliente.IdCredenciales?.Usuario || ''

            }
          };
          
        }
      },
      error: (err) => {
        console.error('Error al obtener cliente:', err);
      }
    });
  }

  guardarCambios() {
    console.log('Perfil actualizado:', this.usuario);
    // Aquí iría tu llamada PUT si vas a guardar cambios
    this.editando = false;
  }

}
