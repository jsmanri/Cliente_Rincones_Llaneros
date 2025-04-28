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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';

// Chart.js
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

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
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    NgChartsModule,
  ],
  templateUrl: './usuariosadmin.component.html',
  styleUrls: ['./usuariosadmin.component.css']
})
export class UsuariosadminComponent implements OnInit {
  data: any;
  loading = true;
  searchText: string = '';

  displayedColumns: string[] = ['Nombre', 'Activo', 'Rol'];

  // Gráfica Circular - Roles
  rolesChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'] }]
  };

  // Gráfica Barras - Usuarios por Mes
  usuariosPorFechaChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Usuarios Registrados', backgroundColor: '#42A5F5' }]
  };
  
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  };

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
        this.prepareCharts();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  prepareCharts() {
    if (this.data?.RolesCount) {
      this.rolesChartData.labels = this.data.RolesCount.map((r: any) => r.Rol);
      this.rolesChartData.datasets[0].data = this.data.RolesCount.map((r: any) => r.Count);
    }

    if (this.data?.UsuariosPorFecha) {
      this.usuariosPorFechaChartData.labels = this.data.UsuariosPorFecha.map((r: any) => `${r.Mes}/${r.Año}`);
      this.usuariosPorFechaChartData.datasets[0].data = this.data.UsuariosPorFecha.map((r: any) => r.UsuariosRegistrados);
    }
  }

  get filteredUsuarios() {
    if (!this.data?.Usuarios) return [];
    return this.data.Usuarios.filter((user: any) => 
      user.Nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  toggleActivo(usuario: any) {
    usuario.Activo = !usuario.Activo;
    console.log(`Usuario ${usuario.Nombre} activo: ${usuario.Activo}`);
  }
}
