import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    MatButtonModule,
    MatIconModule,
  ],
})
export class RecuperacionComponent {
  paso: number = 1;
  subtitulo: string =
    'Ingrese su correo electrónico para recibir un código de verificación';

  emailForm: FormGroup;
  codigoForm: FormGroup;
  contrasenaForm: FormGroup;

  codigoGenerado: string = '';

  // IDs para enviar al backend
  idUsuario: number | null = null;
  idCredenciales: number | null = null;

  mostrarModal: boolean = false;
  modalMensaje: string = '';

  mostrarNuevaContrasena = false;
  mostrarConfirmarContrasena = false;

  modalTitulo: string = '';
  modalClase: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.emailForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
    this.codigoForm = this.fb.group({
      codigo: ['', Validators.required],
    });
    this.contrasenaForm = this.fb.group(
      {
        nuevaContrasena: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{10}$'
            ),
          ],
        ],
        confirmarContrasena: ['', Validators.required],
      },
      { validators: this.passwordsIgualesValidator }
    );
  }

  getPasswordError(): string | null {
    const control = this.contrasenaForm.get('nuevaContrasena');
    const value = control?.value || '';

    if (control?.hasError('required')) {
      return 'La contraseña es obligatoria.';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Debe contener al menos una letra mayúscula.';
    }
    if (!/\d/.test(value)) {
      return 'Debe contener al menos un número.';
    }
    if (!/[$@$!%*?&]/.test(value)) {
      return 'Debe contener al menos un carácter especial.';
    }
    if (value.length < 10) {
      return 'La contraseña debe tener al menos 10 caracteres.';
    }
    return null;
  }

  generarCodigo(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  enviarCodigo() {
    if (this.emailForm.valid) {
      const correo = this.emailForm.value.correo;
      const url = `${API_URLS.CRUD.Api_crudUsuarios}?query=Correo:${correo}`;
      this.apiService.get<any>(url).subscribe({
        next: (respuesta) => {
          const usuarios = respuesta['usuarios consultados'];
          if (usuarios && usuarios.length > 0) {
            // Guarda los IDs necesarios
            this.idUsuario = usuarios[0].Id;
            this.idCredenciales =
              usuarios[0].IdCredencialesCredenciales?.Id || null;

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
              message: codigo,
            };

            emailjs.send(serviceID, templateID, templateParams, userID).then(
              () => {
                this.paso = 2;
                this.subtitulo = 'Ingresa el código que recibiste por correo';
              },
              (error) => {
                this.mostrarModalError(
                  'Ocurrió un error al enviar el correo. Intenta nuevamente.'
                );
                console.error(error);
              }
            );
          } else {
            this.mostrarModalError('El correo ingresado no está registrado.');
          }
        },
        error: (error) => {
          this.mostrarModalError(
            'Ocurrió un error al consultar el correo. Intenta nuevamente.'
          );
        },
      });
    }
  }

  mostrarModalError(mensaje: string, titulo: string = 'Error') {
    this.modalTitulo = titulo;
    this.modalMensaje = mensaje;
    this.modalClase = titulo === 'Exito' ? 'titulo-exito' : 'titulo-error';
    this.mostrarModal = true;
  }

  cerrarModal() {
    if (this.modalMensaje.includes('ha sido actualizada')) {
      this.router.navigate(['/login']);
    }
    this.mostrarModal = false;
    this.modalMensaje = '';
  }

  verificarCodigo() {
    if (this.codigoForm.valid) {
      const codigoIngresado = this.codigoForm.value.codigo;
      if (codigoIngresado === this.codigoGenerado) {
        this.paso = 3;
        this.subtitulo = 'Crea tu nueva contraseña';
      } else {
        this.mostrarModalError('El código ingresado no es correcto.');
      }
    }
  }

  cambiarContrasena() {
    if (this.contrasenaForm.invalid) {
      this.mostrarModalError(
        'Por favor completa todos los campos correctamente'
      );
      return;
    }

    if (this.contrasenaForm.errors?.['passwordsNoCoinciden']) {
      this.mostrarModalError('Las contraseñas no coinciden');
      return;
    }

    // Verifica que los IDs estén presentes
    if (!this.idUsuario || !this.idCredenciales) {
      this.mostrarModalError(
        'No se pudo identificar el usuario. Intenta el proceso de nuevo.'
      );
      return;
    }

    // Prepara el JSON para el backend MID
    const payload = {
      idUsuario: this.idUsuario,
      idCredenciales: this.idCredenciales,
      nuevaContrasena: this.contrasenaForm.value.nuevaContrasena,
    };

    this.apiService.post<any>(API_URLS.Mid.Api_Newpassword, payload).subscribe({
      next: (respuesta) => {
        if (respuesta && respuesta.success) {
          this.mostrarModalError(
            'Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión.',
            'Exito'
          );
          this.mostrarModal = true;
        } else {
          this.mostrarModalError(
            respuesta?.message ||
              'No se pudo actualizar la contraseña. Intenta nuevamente.'
          );
        }
      },
      error: (error) => {
        this.mostrarModalError(
          'Ocurrió un error al actualizar la contraseña. Intenta nuevamente.'
        );
      },
    });
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
