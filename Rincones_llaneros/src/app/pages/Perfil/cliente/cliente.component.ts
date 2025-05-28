import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent implements OnInit {

  editando = false;

  usuario = {
    nombre: 'Laura Martínez',
    rol: { nombre: 'cliente' },
    correo: 'laura.martinez@example.com',
    cedula: '1098765432',
    numeroTelefono: '+57 311 456 7890',
    fotoPerfil: 'https://i.pravatar.cc/150?img=5',
    activo: true,
    idCredencialesCredenciales: {
      usuario: 'lauram'
    },
    idcredenciales:'lau1293*'
  };

  constructor() {}

  ngOnInit(): void {}

  guardarCambios() {
    console.log('Perfil actualizado:', this.usuario);
    // Aquí iría tu llamada al servicio PUT
    this.editando = false;
  }

}
