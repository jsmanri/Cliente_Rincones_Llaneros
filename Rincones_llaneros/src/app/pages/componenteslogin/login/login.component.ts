import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../services/api.services';
import { API_URLS } from '../../../../config/api-config';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword = true;

  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router, private apiService: ApiService) {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  private mostrarErrorLogin(errorCode: string) {
    console.log('error que recibe', errorCode)
    if (errorCode === 'correo_no_encontrado') {
      alert('El correo no existe. Por favor, verifica tu correo.');
    } else if (errorCode === 'contrasena_incorrecta') {
      alert('La contraseña es incorrecta.');
    } else {
      alert('Error desconocido: ' + errorCode);
    }
  }

  login() {
    const payload = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.apiService.post(API_URLS.Mid.Api_Sesion, payload).subscribe(
      (response: any) => {
        console.log('Respuesta del API Mid:', response);
        if (response.error) {
          this.mostrarErrorLogin(response.error);
        } else if (response.id_usuario && response.id_rol) {
          alert('Inicio de sesión exitoso');
          // Aquí puedes guardar los datos o redireccionar
          // this.router.navigate(['/home']);
        } else {
          alert('Respuesta inesperada del servidor.');
        }
      },
      error => {
        // Aquí Angular pone la respuesta de error backend en error.error
        if (error.error && error.error.error) {
          this.mostrarErrorLogin(error.error.error);
        } else {
          alert('No se pudo conectar al servidor.');
        }
      }
    );
  }

  recoverPassword() {
    this.router.navigate(['/recuperacion']);
  }

  createAccount() {
    alert('Crear nueva cuenta');
  }
}