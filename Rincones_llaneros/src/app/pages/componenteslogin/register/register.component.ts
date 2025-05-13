import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{5,15}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d$@$!%*?&]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
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
      };
      reader.readAsDataURL(file);
    }
  }

  removeProfilePicture(): void {
    this.fotoPerfil = null;
    this.previewUrl = null;
    this.base64Image = null;
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
      fotoPerfil: this.base64Image
    };

    this.http.post('http://localhost:8000/usuarios', usuario).subscribe({
      next: (res) => {
        console.log('Usuario registrado con éxito:', res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
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
