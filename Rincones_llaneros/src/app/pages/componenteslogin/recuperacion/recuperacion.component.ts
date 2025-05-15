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
  subtitulo: string = 'Ingrese su correo electrónico para recibir un código de verificación';

  emailForm: FormGroup;
  codigoForm: FormGroup;
  contrasenaForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]]
    });

    this.codigoForm = this.fb.group({
      codigo: ['', Validators.required]
    });

    this.contrasenaForm = this.fb.group({
      nuevaContrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.passwordsIgualesValidator });
  }

  enviarCodigo() {
    if (this.emailForm.valid) {
      console.log('Código enviado a:', this.emailForm.value.correo);
      this.paso = 2;
      this.subtitulo = 'Ingresa el código que recibiste por correo';
    }
  }

  verificarCodigo() {
    if (this.codigoForm.valid) {
      console.log('Código verificado:', this.codigoForm.value.codigo);
      this.paso = 3;
      this.subtitulo = 'Crea tu nueva contraseña';
    }
  }

  cambiarContrasena() {
    if (this.contrasenaForm.invalid) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    if (this.contrasenaForm.errors?.['passwordsNoCoinciden']) {
      alert('Las contraseñas no coinciden');
      return;
    }

    console.log('Contraseña cambiada con éxito');
    alert('Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']);
  }

  passwordsIgualesValidator(form: FormGroup) {
    const pass = form.get('nuevaContrasena')?.value;
    const confirm = form.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { passwordsNoCoinciden: true };
  }

  volverALogin() {
    this.router.navigate(['/login']);
  }
}
