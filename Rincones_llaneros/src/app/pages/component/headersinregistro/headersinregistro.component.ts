import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headersinregistro',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
  ],
  templateUrl: './headersinregistro.component.html',
  styleUrl: './headersinregistro.component.css'
})
export class HeadersinregistroComponent {
  searchText: string = ''; // Captura lo que escribe el usuario

  constructor(private router: Router, private apiService: ApiService) {}

  goToRegister() {
    console.log('Boton de tendencias clickeado');
    this.router.navigate(['/register']);
  }

  onSearch() {
    console.log('Texto de búsqueda:', this.searchText);
    // Aquí puedes agregar lógica de búsqueda real, como navegación o filtrado
    // Ejemplo: this.router.navigate(['/buscar'], { queryParams: { q: this.searchText } });
  }
}