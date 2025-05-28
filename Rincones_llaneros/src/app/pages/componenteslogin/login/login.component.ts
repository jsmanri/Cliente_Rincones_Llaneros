import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
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
 constructor(private router:Router){}

  hidePassword = true;

  goToRegister(){
    console.log('Boton de registro clickeado');
    this.router.navigate(['/register']);
  }

  login(){
    alert('iniciando sessionStorage..')
    this.router.navigate(['/home']);
  }
  recoverPassword(){
    console.log('ingresando a recuperar contraseña')
    this.router.navigate(['/recuperacion'])
  }
  createAccount(){
    alert('Crear nueva cuenta')
  }

}