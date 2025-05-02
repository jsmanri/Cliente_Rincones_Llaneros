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
  testimonios: { mensaje: string, autor: string, imagen: string, calificacion: number }[] = [];

  private testimoniosActividad: { [key: string]: { mensaje: string, autor: string, imagen: string, calificacion: number }[] } = {
    caballo: [
      { mensaje: "Una experiencia inolvidable montando a caballo.", autor: "Luis Fernández", imagen: "/assets/usuarios/usuario1.jpg", calificacion: 5 },
      { mensaje: "Me sentí como un verdadero llanero.", autor: "Ana Torres", imagen: "/assets/usuarios/usuario2.jpg", calificacion: 4 }
    ],
    restaurantes: [
      { mensaje: "La mejor carne a la llanera que he probado.", autor: "Carlos Ramírez", imagen: "/Juan.jpg", calificacion: 5 },
      { mensaje: "Comida deliciosa y excelente atención.", autor: "Laura Mendoza", imagen: "/Widow.jpg", calificacion: 5 }
    ],
    museos: [
      { mensaje: "Aprendí mucho sobre la historia llanera.", autor: "Mónica Díaz", imagen: "/assets/usuarios/usuario5.jpg", calificacion: 4 }
    ],
    monumentos: [
      { mensaje: "Muy bonitos y bien cuidados.", autor: "Sergio Gómez", imagen: "/assets/usuarios/usuario6.jpg", calificacion: 4 }
    ],
    caminata: [
      { mensaje: "Senderos tranquilos y aire puro.", autor: "Isabel Herrera", imagen: "/assets/usuarios/usuario7.jpg", calificacion: 5 }
    ],
    safari: [
      { mensaje: "Vi animales increíbles, inolvidable.", autor: "Pedro Vargas", imagen: "/assets/usuarios/usuario8.jpg", calificacion: 5 }
    ]
  };
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
      this.municipios = [];
      this.horario = 'Todos los días de 11:00 am a 10:00 pm';
      this.ubicacion = 'Centros urbanos principales.';
    } 
    else if (actividad === 'museos') {
      this.nombreActividad = 'Museos';
      this.descripcionActividad = 'Descubre la historia y cultura de Casanare en sus museos más representativos.';
      this.municipios = ['Yopal', 'Tauramena', 'Villanueva'];
      this.horario = 'De lunes a viernes, 9:00 am a 5:00 pm';
      this.ubicacion = 'Museos locales en cada municipio.';
    } 
    else if (actividad === 'monumentos') {
      this.nombreActividad = 'Monumentos';
      this.descripcionActividad = 'Conoce los monumentos emblemáticos que rinden homenaje a la tradición llanera.';
      this.municipios = ['Yopal', 'Hato Corozal', 'San Luis de Palenque'];
      this.horario = 'De lunes a domingo, 8:00 am a 6:00 pm';
      this.ubicacion = 'Ubicados en parques y plazas principales.';
    } 
    else if (actividad === 'caminata') {
      this.nombreActividad = 'Caminata Ecológica';
      this.descripcionActividad = 'Explora senderos naturales mientras disfrutas del aire puro y la fauna local.';
      this.municipios = ['Yopal', 'Villanueva', 'Aguazul'];
      this.horario = 'De lunes a domingo, 6:00 am a 4:00 pm';
      this.ubicacion = 'Senderos en zonas rurales y parques naturales.';
    } 
    else if (actividad === 'safari') {
      this.nombreActividad = 'Safari Casanare';
      this.descripcionActividad = 'Una experiencia única para observar animales en su hábitat natural.';
      this.municipios = ['Yopal', 'Recetor', 'Támara'];
      this.horario = 'Todos los días de 5:00 am a 5:00 pm';
      this.ubicacion = 'Zonas rurales y reservas naturales.';
    }
    
    if (actividad) {
      this.testimonios = this.testimoniosActividad[actividad] || [];
    }
    

  }
  getEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }
}
