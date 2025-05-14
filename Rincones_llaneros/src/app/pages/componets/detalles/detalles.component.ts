import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-detalles',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  nombreActividad: string = '';
  descripcionActividad: string = '';
  municipios: string[] = [];
  horario: string = '';
  testimonios: { mensaje: string, autor: string, imagen: string, calificacion: number }[] = [];
  imagenActividad: string ='';
  puntosmunicipios: {[municipio: string]: string[]}= {};
  recomendaciones: string [] = [];
  imagenescarrusel: string[] = [];
  indiceimagenactual: number =0;


  private testimoniosActividad: { [key: string]: { mensaje: string, autor: string, imagen: string, calificacion: number }[] } = {
    caballo: [
      { mensaje: "Una experiencia inolvidable montando a caballo.", autor: "Luis Fernández", imagen: "/assets/usuarios/usuario1.jpg", calificacion: 5 },
      { mensaje: "Me sentí como un verdadero llanero.", autor: "Ana Torres", imagen: "/assets/usuarios/usuario2.jpg", calificacion: 4 }
    ],
    restaurantes: [
      { mensaje: "La mejor carne a la llanera que he probado.", autor: "Carlos Ramírez", imagen: "/Juan.jpg", calificacion: 5 },
      { mensaje: "Comida deliciosa y excelente atención.", autor: "Laura Mendoza", imagen: "/Widow.jpg", calificacion: 4 }
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
    ],
    Hoteles: [
      {
        mensaje: "Un lugar cómodo y limpio para descansar después de un día de aventura.",
        autor: "Valentina Ríos",
        imagen: "/assets/usuarios/usuario9.jpg",
        calificacion: 4
      },
      {
        mensaje: "El personal fue muy amable y la vista desde mi habitación era espectacular.",
        autor: "Andrés Gómez",
        imagen: "/assets/usuarios/usuario10.jpg",
        calificacion: 5
      }
    ],
    Pisicinas: [
      {
        mensaje: "Perfecto para relajarse bajo el sol, el agua estaba en excelente estado.",
        autor: "Camila Duarte",
        imagen: "/assets/usuarios/usuario11.jpg",
        calificacion: 5
      },
      {
        mensaje: "Ideal para ir en familia, mis hijos la pasaron increíble.",
        autor: "Diego Suárez",
        imagen: "/assets/usuarios/usuario12.jpg",
        calificacion: 4
      }
    ]
  };
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const actividad = this.route.snapshot.queryParamMap.get('actividad');

    if (actividad === 'caballo') {
      this.nombreActividad = 'Paseo a Caballo';
      this.descripcionActividad = 'Recorre los llanos montando a caballo como un verdadero llanero.';
      this.horario = 'Todos los días de 7:00 am a 5:00 pm';
      this.imagenActividad = '/Casanare-3.jpg';
      this.recomendaciones = ['llevar ropa comoda', 'protector solar','dhdh','sjdh','dndn'];

      this.puntosmunicipios = {
        Yopal: ['Finca el palmar','Hato la Candelaria'],
        Morichal: [''],
                Aguazul: [],

      }
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    
    } 
    else if (actividad === 'restaurantes') {
      this.nombreActividad = 'Restaurantes';
      this.descripcionActividad = 'Deléitate con lo mejor de la gastronomía llanera.';
      this.municipios = ['Yopal', 'Medellín'];
      this.horario = 'Todos los días de 11:00 am a 10:00 pm';
      this.imagenActividad = '/comida.jpg';
      this.recomendaciones = ['Disfruta de la comida'];
      this.puntosmunicipios = {
        Yopal: ['Restaurante El Llanero', 'Parrilla La Sabana'],
        Aguazul: [],
        Chámeza: [],
        HatoCorozal: [],
        LaSalina: [],
        Maní: [],
        Monterrey: [],
        Nunchía: [],
        Orocué: [],
        PazdeAriporo: [],
        Pore: [],
        Recetor: [],
        Sabanalarga: [],
        Sácama: [],
        SanLuisdePalenque: [],
        Támara: [],
        Tauramena: [],
        Trinidad: [],
        Villanueva: []
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    } 
    else if (actividad === 'museos') {
      this.nombreActividad = 'Museos';
      this.descripcionActividad = 'Descubre la historia y cultura de Casanare en sus museos más representativos.';
      this.municipios = ['Yopal', 'Tauramena', 'Villanueva'];
      this.horario = 'De lunes a viernes, 9:00 am a 5:00 pm';
      this.imagenActividad = '';
      this.puntosmunicipios = {
        Yopal: ['Museo del Hombre Llanero'],
        Tauramena: ['Casa de la Cultura Tauramena'],
        Villanueva: ['Centro Cultural Llanero']
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    } 
    else if (actividad === 'monumentos') {
      this.nombreActividad = 'Monumentos';
      this.descripcionActividad = 'Conoce los monumentos emblemáticos que rinden homenaje a la tradición llanera.';
      this.municipios = ['Yopal', 'Hato Corozal', 'San Luis de Palenque'];
      this.horario = 'De lunes a domingo, 8:00 am a 6:00 pm';
      this.imagenActividad = '';
      this.puntosmunicipios = {
        Yopal: ['Monumento al Centauro'],
        'Hato Corozal': ['Estatua del Fundador'],
        'San Luis de Palenque': ['Obelisco de la Llanura']
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    } 
    else if (actividad === 'caminata') {
      this.nombreActividad = 'Caminata Ecológica';
      this.descripcionActividad = 'Explora senderos naturales mientras disfrutas del aire puro y la fauna local.';
      this.municipios = ['Yopal', 'Villanueva', 'Aguazul'];
      this.horario = 'De lunes a domingo, 6:00 am a 4:00 pm';
      this.imagenActividad = '';
      this.puntosmunicipios = {
        Yopal: ['Sendero La Aguatoca'],
        Villanueva: ['Ruta Ecológica El Morro'],
        Aguazul: ['Camino Verde Llanero']
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    } 
    else if (actividad === 'safari') {
      this.nombreActividad = 'Safari Casanare';
      this.descripcionActividad = 'Una experiencia única para observar animales en su hábitat natural.';
      this.municipios = ['Yopal', 'Recetor', 'Támara'];
      this.horario = 'Todos los días de 5:00 am a 5:00 pm';
      this.imagenActividad = '';
      this.puntosmunicipios = {
        Yopal: ['Hato La Aurora'],
        Recetor: ['Reserva Faunística El Tigre'],
        Támara: ['Hato El Encanto']
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    }
    else if (actividad === 'Hoteles') {
      this.nombreActividad = 'Hoteles';
      this.descripcionActividad = 'Una experiencia única para observar animales en su hábitat natural.';
      this.horario = 'Todos los días de 5:00 am a 12:00 pm';
      this.imagenActividad = '';
      this.puntosmunicipios = {
        Yopal: ['Hato La Aurora'],
        Aguazul: [],
        Chámeza: [],
        HatoCorozal: [],
        LaSalina: [],
        Maní: [],
        Monterrey: [],
        Nunchía: [],
        Orocué: [],
        PazdeAriporo: [],
        Pore: [],
        Recetor: [],
        Sabanalarga: [],
        Sácama: [],
        SanLuisdePalenque: [],
        Támara: [],
        Tauramena: [],
        Trinidad: [],
        Villanueva: []
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    }
    else if (actividad === 'Piscinas') {
      this.nombreActividad = 'Piscinas';
      this.descripcionActividad = 'Relájate y disfruta del agua en los mejores destinos de Casanare.';
      this.municipios = ['Yopal', 'Aguazul', 'Paz de Ariporo', 'Monterrey', 'San Luis de Palenque', 'Orocué'];
      this.horario = 'Varía según el establecimiento; se recomienda consultar directamente.';
      this.imagenActividad = '/piscinas.jpg';
      this.recomendaciones = [
        'Lleva protector solar y ropa cómoda.',
        'Consulta horarios de apertura y tarifas antes de visitar.',
        'Respeta las normas de seguridad acuática.'
      ];
      this.puntosmunicipios = {
        Yopal: [
          'Parque Acuático Nacua',
          'Piscina Natural La Aguatoca'
        ],
        Aguazul: [
          'Parque del Arroz',
          'Finca Turística Paisanare'
        ],
        PazdeAriporo: [
          'Piscina Totumo',
          'El Lago Azul',
          'Hotel Pie De Monte',
          'Parque Ecológico Juan Nepomuceno Moreno',
          'Piscina Villa Rosita',
          'Cabaña Campestre Villa Karol'
        ],
        Monterrey: [
          'Hotel Los Lagos Centro Vacacional'
        ],
        SanLuisdePalenque: [
          'Centro Recreacional y Balneario Carana'
        ],
        Orocué: [
          'Hato San Pablo'
        ]
      };
      this.imagenescarrusel =[
        '/img3.jpg',
        '/comida.jpg',
        '/elemento.jpg'
      ]
    }
    
    
    if (actividad) {
      this.testimonios = this.testimoniosActividad[actividad] || [];
    }
  


    

  }
  getEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }
  municipioSeleccionado: string | null = null;

  seleccionarMunicipio(municipio: string): void {
    this.municipioSeleccionado = municipio === this.municipioSeleccionado ? null : municipio;

  }

  getMunicipios(): string[] {
    return Object.keys(this.puntosmunicipios );
  }
  
  siguienteimagen() {
    this.indiceimagenactual = (this.indiceimagenactual + 1) % this.imagenescarrusel.length;
  }
  anteriorImagen() {
    this.indiceimagenactual = (this.indiceimagenactual - 1 + this.imagenescarrusel.length) % this.imagenescarrusel.length;
  }
  
  goToPusvolver() {
    this.router.navigate(['/vista2']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
