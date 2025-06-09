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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ViewChild,TemplateRef } from '@angular/core';

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
    MatCheckboxModule,
    MatIcon,
    MatDialogModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  fotoPerfil: File | null = null;
  previewUrl: string | null = null;
  base64Image: string | null = null;
  roles: { Id: number, Nombre: string }[] = [];
  registrationSuccess = false; // Indicador de registro exitoso
  showPassword = false;
  showConfirmPassword = false;

  @ViewChild('successDialog') successDialog!: TemplateRef<any>;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      fotoPerfil: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d$@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue] // Aceptar términos es obligatorio
    }, { validator: this.passwordMatchValidator });

    this.loadRoles();
  }

  onlyNumberKey(event: KeyboardEvent): boolean {
  const charCode = event.which ? event.which : event.keyCode;
  // Permite solo números del 0 al 9 (códigos ASCII)
  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
    return false;
  }
  return true;
  }

  getPasswordError(): string | null {
  const control = this.registerForm.get('password');
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


  private loadRoles(): void {
    this.apiService.get<any>(API_URLS.CRUD.Api_crudRol).subscribe({
      next: (response) => {
        if (response.status === 200 && response.success) {
          this.roles = response['roles consultados']
            .filter((role: any) => role.Activo)
            .map((role: any) => ({ Id: role.Id, Nombre: role.Nombre }));
        }
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
        alert('Error al cargar roles. Por favor, inténtalo nuevamente.');
      }
    });
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fotoPerfil = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
        this.base64Image = reader.result?.toString().split(',')[1] ?? null;
        this.registerForm.get('fotoPerfil')?.setValue(this.base64Image);
        this.registerForm.get('fotoPerfil')?.markAsTouched();
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture(): void {
    this.fotoPerfil = null;
    this.previewUrl = null;
    this.base64Image = null;
    this.registerForm.get('fotoPerfil')?.setValue(null);
  }

  register(): void {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => control.markAsTouched());
   
      return;
    }

    const usuario = {
      rol: this.registerForm.value.role,
      nombre: this.registerForm.value.fullName,
      correo: this.registerForm.value.email,
      cedula: this.registerForm.value.cedula,
      telefono: this.registerForm.value.telefono,
      contrasena: this.registerForm.value.password,
      fotoPerfil: this.base64Image || null
    };
    console.log("json para el api mid ",usuario)

    this.apiService.post(API_URLS.Mid.Api_midCreacionUsuario, usuario).subscribe({
      next: () => {
        const dialogRef = this.dialog.open(this.successDialog, {
          disableClose: true,
          width: '350px'
        });
        setTimeout(() => {
          dialogRef.close();
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        alert('Error al registrar usuario. Por favor, inténtalo nuevamente.');
      }
    });
  }

  goToPolitica() {
    this.router.navigate(['/politica']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}