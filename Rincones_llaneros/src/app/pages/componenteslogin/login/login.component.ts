import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.services';
import { API_URLS } from '../../../../config/api-config';

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
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
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
          // Aquí puedes almacenar la sesión o redirigir
          this.router.navigate(['/home']);
        } else {
          alert('Respuesta inesperada del servidor.');
        }
      },
      error => {
        console.error('Error desde el API Mid:', error);
        if (error.error && error.error.error) {
          this.setServerErrors(error.error.error);
        } else {
          alert('Error de conexión con el servidor.');
        }
      }
    );
  }

  private setServerErrors(errorCode: string) {
    if (errorCode === 'correo_no_encontrado') {
      this.correoControl?.setErrors({ serverError: 'El correo no existe.' });
    } else if (errorCode === 'contrasena_incorrecta') {
      this.contrasenaControl?.setErrors({ serverError: 'La contraseña es incorrecta.' });
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
