import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-usuarios',
  imports: [
    CommonModule,
    MatCardModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {


  // Pie chart - Categorías
  pieChartLabels: string[] = ['Museos', 'Piscinas', 'Restaurantes', 'Bares', 'Parques', 'Hoteles'];
  pieChartData: number[] = [10, 15, 20, 10, 25, 30];
  pieChartColors: string[] = ['#002b5b', '#023e8a', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'];

  // Bar chart - Municipios
  barChartLabels: string[] = ['Yopal', 'Aguazul', 'Monterrey', 'Maní', 'Villanueva', 'Salina', 'Trinidad', 'Pore'];
  barChartData: number[] = [80, 75, 70, 65, 60, 55, 50, 45];
  barChartColors: string[] = ['#03045e', '#023e8a', '#0077b6', '#0096c7', '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4'];

  // Line chart - Evolución temporal
  lineChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  lineChartData: ChartDataset<'line'>[] = [
    {
      data: [30, 35, 60, 40, 30, 32],
      label: 'Publicados',
      borderColor: '#00b4d8',
      backgroundColor: 'rgba(0,180,216,0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#00b4d8'
    },
    {
      data: [25, 28, 30, 22, 40, 28],
      label: 'Eliminación',
      borderColor: '#ef233c',
      backgroundColor: 'rgba(239,35,60,0.2)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#ef233c'
    }
  ];

}
