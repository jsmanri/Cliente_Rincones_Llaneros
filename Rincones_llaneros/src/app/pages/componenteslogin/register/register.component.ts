import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../../../services/api.services';
import { API_URLS } from '../../../../config/api-config';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Angular Material Modules
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIcon
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  fotoPerfil: File | null = null;
  previewUrl: string | null = null;
  base64Image: string | null = null;
  roles: { Id: number, Nombre: string }[] = []; // Roles cargados desde la API

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService // Inyecta el servicio API
  ) {
    // Configuración del formulario reactivo
    this.registerForm = this.fb.group({
      role: ['', Validators.required], // Selector de rol obligatorio
      fullName: ['', [Validators.required, Validators.minLength(4)]], // Nombre completo obligatorio
      email: ['', [Validators.required, Validators.email]], // Email obligatorio con validación de formato
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Cédula de exactamente 10 dígitos
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Teléfono de exactamente 10 dígitos
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d$@$!%*?&]{8,}$')
      ]], // Contraseña con validaciones fuertes
      confirmPassword: ['', Validators.required] // Confirmación de contraseña obligatoria
    }, { validator: this.passwordMatchValidator });

    // Cargar roles dinámicamente desde la API
    this.loadRoles();
  }

  // Método para cargar roles desde la API
  private loadRoles(): void {
    this.apiService.get<any>(API_URLS.CRUD.Api_crudRol).subscribe({
      next: (response) => {
        if (response.status === 200 && response.success) {
          this.roles = response['roles consultados']
            .filter((role: any) => role.Activo) // Filtrar solo roles activos
            .map((role: any) => ({ Id: role.Id, Nombre: role.Nombre })); // Mapear a Id y Nombre
        }
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        alert('Error al cargar roles. Por favor, inténtalo nuevamente.');
      }
    });
  }

  // Validador personalizado para confirmar que las contraseñas coinciden
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  // Manejo de selección de archivo para la foto de perfil
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fotoPerfil = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.base64Image = reader.result?.toString().split(',')[1] ?? null;
      };
      reader.readAsDataURL(file);
    }
  }

  // Eliminar la imagen seleccionada
  removeProfilePicture(): void {
    this.fotoPerfil = null;
    this.previewUrl = null;
    this.base64Image = null;
  }

  // Método para registrar al usuario
  register(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());
      return;
    }

    // Construcción del objeto JSON a enviar al API
    const usuario = {
      rol: this.registerForm.value.role, // Enviar el Id del rol seleccionado
      nombre: this.registerForm.value.fullName,
      correo: this.registerForm.value.email,
      cedula: this.registerForm.value.cedula,
      telefono: this.registerForm.value.telefono,
      contrasena: this.registerForm.value.password,
      fotoPerfil: this.base64Image // Null si no se cargó una imagen
    };

    console.log('JSON a enviar al API Mid:', usuario);

    // Enviar el JSON al endpoint del API Mid para creación de usuario
    this.apiService.post(API_URLS.Mid.Api_midCreacionUsuario, usuario).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito:', res);
        alert('¡Usuario registrado con éxito!');
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario. Por favor, inténtalo nuevamente.');
      }
    });
  }

  // Navegación a la página de términos y condiciones
  goToPolitica() {
    this.router.navigate(['/politica']);
  }

  // Navegación a la página de inicio de sesión
  goToLogin() {
    this.router.navigate(['/login']);
  }
}