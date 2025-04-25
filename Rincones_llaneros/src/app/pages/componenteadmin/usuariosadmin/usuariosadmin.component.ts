import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.services';
import { API_URLS } from '../../../../config/api-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-usuariosadmin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './usuariosadmin.component.html',
  styleUrls: ['./usuariosadmin.component.css']
})
export class UsuariosadminComponent implements OnInit {
  // Datos de la API
  data: any;
  loading = true;
  
  // Filtros
  searchText: string = '';
  
  // Columnas para la tabla
  displayedColumns: string[] = ['Nombre', 'Activo', 'Rol'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.get<any>(API_URLS.Mid.Api_mid).subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
        console.log('Datos recibidos:', this.data);
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  // Filtrar usuarios
  get filteredUsuarios() {
    if (!this.data?.Usuarios) return [];
    return this.data.Usuarios.filter((user: any) => 
      user.Nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}