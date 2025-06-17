import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
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
import { Router } from '@angular/router';

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
  selectedRol: string = 'vendedor';

  displayedColumns: string[] = ['Nombre', 'Activo'];

  rolesChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC'] }]
  };

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

  constructor(private api: ApiService,private router: Router) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(year: number = this.selectedYear) {
    this.loading = true;

    this.api.get<any>(`${API_URLS.Mid.Api_mid}?anio=${year}`).subscribe({
      next: (res) => {
        this.data = res;
        console.log('RolesCount:', this.data?.RolesCount); // <-- Para depuración
        this.loading = false;
        this.prepareCharts();
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  prepareCharts() {
    // Gráfica de Roles - normalizar nombres
    if (this.data?.RolesCount) {
      const rolesNormalizados = this.data.RolesCount.map((r: any) => ({
        Rol: r.Rol.trim().toLowerCase(),
        Count: r.Count
      }));

      const rolesAgrupados: { [key: string]: number } = {};
      for (const rol of rolesNormalizados) {
        if (!rolesAgrupados[rol.Rol]) {
          rolesAgrupados[rol.Rol] = 0;
        }
        rolesAgrupados[rol.Rol] += rol.Count;
      }

      this.rolesChartData.labels = Object.keys(rolesAgrupados).map((rol) =>
        rol.charAt(0).toUpperCase() + rol.slice(1)
      );
      this.rolesChartData.datasets[0].data = Object.values(rolesAgrupados);
    }

    // Gráfica de Usuarios por Mes
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

  nombreMes(mes: number): string {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return meses[mes - 1] || `Mes ${mes}`;
  }

  cambiarAnio(valor: number) {
    this.selectedYear += valor;
    this.loadData(this.selectedYear);
  }

  get filteredUsuarios() {
    if (!this.data?.Usuarios) return [];
    return this.data.Usuarios
      .filter((user: any) => user.RolNombre?.toLowerCase() === this.selectedRol)
      .filter((user: any) =>
        user.Nombre.toLowerCase().includes(this.searchText.toLowerCase())
      );
  }

  cambiarRol(rol: string) {
    this.selectedRol = rol;
  }

  toggleActivo(usuario: any) {
    usuario.Activo = !usuario.Activo;

    const url = `${API_URLS.CRUD.Api_crudUsuarios}/${usuario.Id}`;
    const updatedUsuario = { Activo: usuario.Activo };

    this.api.patch(url, updatedUsuario).subscribe({
      next: () => {
        // Actualización exitosa
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        usuario.Activo = !usuario.Activo; // revertir
      }
    });
  }
  cerrarSesion() {
  localStorage.removeItem('usuarioId'); // 🔹 Elimina el ID del usuario de la sesión
  this.router.navigate(['/login']); // 🔹 Redirige al login (ajusta la ruta según tu configuración)
}

}
