import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Importa ApiService y la configuración
import { API_URLS } from '../../../../config/api-config';
import { ApiService } from '../../../../services/api.services';

// Importa EmailJS
import emailjs from 'emailjs-com';

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

  mensajeError: string = '';
  codigoGenerado: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
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

  generarCodigo(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  enviarCodigo() {
    this.mensajeError = '';
    if (this.emailForm.valid) {
      const correo = this.emailForm.value.correo;
      const url = `${API_URLS.CRUD.Api_crudUsuarios}?query=Correo:${correo}`;
      this.apiService.get<any>(url).subscribe({
        next: (respuesta) => {
          const usuarios = respuesta['usuarios consultados'];
          if (usuarios && usuarios.length > 0) {
            // Genera el código
            const codigo = this.generarCodigo();
            this.codigoGenerado = codigo;

            // EmailJS: cambia por tus IDs reales
            const serviceID = 'service_d60ceh3';
            const templateID = 'template_pgs65fn';
            const userID = 'x_5b8255fdDxP4wts';

            // Solo las variables de tu template
            const templateParams = {
              title: 'Recuperación de contraseña – Código de verificación',
              email: correo,
              message: codigo
            };

            emailjs.send(serviceID, templateID, templateParams, userID)
              .then(() => {
                this.paso = 2;
                this.subtitulo = 'Ingresa el código que recibiste por correo';
              }, (error) => {
                this.mensajeError = 'Ocurrió un error al enviar el correo. Intenta nuevamente.';
                console.error(error);
              });

          } else {
            this.mensajeError = 'El correo ingresado no está registrado.';
          }
        },
        error: (error) => {
          this.mensajeError = 'Ocurrió un error al consultar el correo. Intenta nuevamente.';
        }
      });
    }
  }

  verificarCodigo() {
    if (this.codigoForm.valid) {
      const codigoIngresado = this.codigoForm.value.codigo;
      if (codigoIngresado === this.codigoGenerado) {
        this.paso = 3;
        this.subtitulo = 'Crea tu nueva contraseña';
        this.mensajeError = '';
      } else {
        this.mensajeError = 'El código ingresado no es correcto.';
      }
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

    // Aquí deberías hacer el cambio de contraseña vía API
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