import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recuperacion',
  standalone: true,
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class RecuperacionComponent {
  paso: number = 1;
  subtitulo: string = 'Ingrese su número telefónico y dale a Enviar código por SMS';

  phoneForm: FormGroup;
  codeForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Paso 1: teléfono
    this.phoneForm = this.fb.group({
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    // Paso 2: código + contraseña
    this.codeForm = this.fb.group({
      codigo: ['', Validators.required],
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    });
  }

  enviarCodigo() {
    if (this.phoneForm.valid) {
      console.log('Código enviado a:', this.phoneForm.value.telefono);
      this.paso = 2;
      this.subtitulo = 'Completa los campos para cambiar tu contraseña';
    }
  }

  cambiarContrasena() {
    const nueva = this.codeForm.value.nuevaContrasena;
    const confirmar = this.codeForm.value.confirmarContrasena;

    if (nueva !== confirmar) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (this.codeForm.valid) {
      console.log('Contraseña cambiada con éxito');
      alert('Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    }
  }

  volverALogin() {
    this.router.navigate(['/login']);
  }
}