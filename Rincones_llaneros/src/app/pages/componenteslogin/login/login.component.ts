import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';
import { API_URLS } from '../../../../config/api-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hidePassword = true;
  loginForm: FormGroup;
  showInactiveModal = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  get correoControl() {
    return this.loginForm.get('correo');
  }

  get contrasenaControl() {
    return this.loginForm.get('contrasena');
  }

login() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const payload = this.loginForm.value;

  this.apiService.post(API_URLS.Mid.Api_Sesion, payload).subscribe(
    (response: any) => {
      console.log('Respuesta completa del API Mid:', response);

      if (response.error) {
        this.setServerErrors(response.error);
      } else if (response.id_usuario && response.id_rol) {
        localStorage.setItem('usuarioId', response.id_usuario.toString());
        localStorage.setItem('usuarioRol', response.id_rol.toString()); // 🔹 Guardar el ID del rol

        this.redirigirSegunRol(response.id_rol, response.id_usuario); // 🔹 Redirigir según el ID del rol
      } else {
        this.showMessage('Hubo un problema inesperado. Intenta más tarde.');
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
      this.showMessage('No se pudo conectar al servidor.');
    }
  );
}

redirigirSegunRol(idRol: number, idUsuario: number) {
  switch (idRol) {
    case 1: // Vendedor
      this.router.navigate([`/home/vendedor/${idUsuario}`]);
      break;
    case 2: // Cliente
      this.router.navigate([`/home/cliente/${idUsuario}`]);
      break;
    case 3: // Administrador
      this.router.navigate(['/usuadmin']);
      break;
    default:
      this.router.navigate(['/home']); // Si el rol no es válido, ir a home por defecto
  }
}

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private setServerErrors(errorCode: string) {
    if (errorCode === 'correo_no_encontrado') {
      this.correoControl?.setErrors({ serverError: 'El correo no existe.' });
    } else if (errorCode === 'contrasena_incorrecta') {
      this.contrasenaControl?.setErrors({
        serverError: 'La contraseña es incorrecta.',
      });
    } else {
      alert('Error desconocido: ' + errorCode);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  recoverPassword() {
    this.router.navigate(['/recuperacion']);
  }
}
