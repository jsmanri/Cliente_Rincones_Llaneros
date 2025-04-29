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
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule
  ],
  templateUrl: './usuariosadmin.component.html',
  styleUrls: ['./usuariosadmin.component.css']
})
export class UsuariosadminComponent implements OnInit {
  data: any;
  loading = true;
  searchText: string = '';
  selectedYear = new Date().getFullYear();

  // Definición de las columnas a mostrar en la tabla
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
    // Realiza la petición para obtener los datos
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
    // Preparar datos para la gráfica de roles
    if (this.data?.RolesCount) {
      this.rolesChartData.labels = this.data.RolesCount.map((r: any) => r.Rol);
      this.rolesChartData.datasets[0].data = this.data.RolesCount.map((r: any) => r.Count);
    }
  
    // Preparar datos para la gráfica de usuarios por fecha
    if (this.data?.UsuariosPorFecha) {
      const datosFiltrados = this.data.UsuariosPorFecha
        .filter((r: any) => String(r['Año']).trim() === String(this.selectedYear))
        .sort((a: any, b: any) => parseInt(a['Mes']) - parseInt(b['Mes']));
  
      if (datosFiltrados.length > 0) {
        this.usuariosPorFechaChartData.labels = datosFiltrados.map((r: any) =>
          this.nombreMes(parseInt(r['Mes']))
        );
        this.usuariosPorFechaChartData.datasets[0].data = datosFiltrados.map(
          (r: any) => r.UsuariosRegistrados
        );
      } else {
        this.usuariosPorFechaChartData.labels = [];
        this.usuariosPorFechaChartData.datasets[0].data = [];
      }
    }
  }

  // Convertir número de mes en su nombre
  nombreMes(mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[mes - 1] || `Mes ${mes}`;
  }

  // Cambiar de año en las gráficas
  cambiarAnio(valor: number) {
    this.selectedYear += valor;
    this.prepareCharts(); // Recargar las gráficas con el nuevo año
  }

  // Filtrar los usuarios según la búsqueda
  get filteredUsuarios() {
    if (!this.data?.Usuarios) return [];
    return this.data.Usuarios.filter((user: any) => 
      user.Nombre.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Cambiar el estado de "Activo" de un usuario
  toggleActivo(usuario: any) {
    usuario.Activo = !usuario.Activo;
    console.log(`Usuario ${usuario.Nombre} activo: ${usuario.Activo}`);
  }
}
