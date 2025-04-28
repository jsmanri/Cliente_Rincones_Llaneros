import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles',
  imports: [
    CommonModule
  ],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  nombreActividad: string = '';
  descripcionActividad: string = '';
  municipios: string[] = [];
  horario: string = '';
  ubicacion: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const actividad = this.route.snapshot.queryParamMap.get('actividad');

    if (actividad === 'caballo') {
      this.nombreActividad = 'Paseo a Caballo';
      this.descripcionActividad = 'Recorre los llanos montando a caballo como un verdadero llanero.';
      this.municipios = ['Yopal', 'Maní', 'Aguazul'];
      this.horario = 'Todos los días de 7:00 am a 5:00 pm';
      this.ubicacion = 'Salida desde el parque principal de cada municipio.';
    } 
    else if (actividad === 'restaurantes') {
      this.nombreActividad = 'Restaurantes';
      this.descripcionActividad = 'Deléitate con lo mejor de la gastronomía llanera.';
      this.municipios = ['Yopal', 'Villanueva', 'Paz de Ariporo'];
      this.horario = 'Todos los días de 11:00 am a 10:00 pm';
      this.ubicacion = 'Centros urbanos principales.';
    }
    // Puedes seguir agregando más actividades aquí
  }
}
