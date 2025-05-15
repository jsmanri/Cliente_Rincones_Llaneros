import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Evento {
  titulo: string;
  descripcion: string;
  fecha: string;
  municipio: string;
  imagen: string;
  autor: string; // vendedor
  direccion: string;
}

interface Sitio {
  titulo: string;
  descripcion: string;
  fecha: string;
  municipio: string;
  imagen: string;
  autor: string; // vendedor
  direccion: string;
}

@Component({
  imports: [
    CommonModule,
    FormsModule
  ],
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  municipios: string[] = ['Yopal', 'Aguazul', 'Villanueva', 'Tauramena', 'Paz de Ariporo'];
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];
  municipioSeleccionado: string = '';
  sitios: Sitio[] = []; // Todos los sitios
  sitiosFiltrados: Sitio[] = [];
  tipoSeleccionado: string = 'evento'; // 'evento' o 'sitio'



  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarEventos();
    this.cargarSitios();
  }



  cargarEventos() {
    this.eventos = [
      {
        titulo: 'Festival del Arroz',
        descripcion: 'Evento gastronómico con música llanera.',
        fecha: '2025-06-10',
        municipio: 'Aguazul',
        imagen: '/rio.jpg',
        autor: 'vendedor1',
        direccion: 'Parque Central de Aguazul, Cra 15 #12-34'
      },
      {
        titulo: 'Carnaval Llanero',
        descripcion: 'Desfile y actividades culturales.',
        fecha: '2025-07-15',
        municipio: 'Yopal',
        imagen: '/R.jpg',
        autor: 'vendedor2',
        direccion: 'Avenida 20 con calle 10, Yopal'
      },
      {
        titulo: 'Feria Agroindustrial',
        descripcion: 'Muestra de productos agrícolas y maquinaria.',
        fecha: '2025-08-20',
        municipio: 'Villanueva',
        imagen: '/assets/eventos/villanueva-feria.jpg',
        autor: 'vendedor3',
        direccion: 'Coliseo Municipal de Villanueva'
      },
      {
        titulo: 'Encuentro Cultural Tauramenero',
        descripcion: 'Danzas, canto y comida típica.',
        fecha: '2025-09-05',
        municipio: 'Tauramena',
        imagen: '/assets/eventos/tauramena-cultura.jpg',
        autor: 'vendedor4',
        direccion: 'Plaza de Bolívar de Tauramena'
      },
      {
        titulo: 'Festival del Río Ariporo',
        descripcion: 'Competencias náuticas y música en vivo.',
        fecha: '2025-10-12',
        municipio: 'Paz de Ariporo',
        imagen: '/assets/eventos/ariporo-rio.jpg',
        autor: 'vendedor5',
        direccion: 'Malecón sobre el río Ariporo'
      },
      {
        titulo: 'Semana Turística de Yopal',
        descripcion: 'Actividades para promocionar el turismo local.',
        fecha: '2025-11-01',
        municipio: 'Yopal',
        imagen: '/assets/eventos/yopal-turismo.jpg',
        autor: 'vendedor6',
        direccion: 'Centro Cultural El Alcaraván, Yopal'
      }
      // más eventos...
    ];
    this.eventosFiltrados = [...this.eventos];
  }
    cargarSitios() {
    this.sitios = [
      {
        titulo: 'Cascada La Calaboza',
        descripcion: 'Hermosa cascada natural para caminatas y baños.',
        fecha: '',
        municipio: 'Tauramena',
        imagen: '/assets/sitios/calaboza.jpg',
        autor: 'admin',
        direccion: 'Vereda El Triunfo, Tauramena'
      },
      {
        titulo: 'Mirador Buenavista',
        descripcion: 'Vista panorámica de todo Yopal.',
        fecha: '',
        municipio: 'Yopal',
        imagen: '/assets/sitios/mirador.jpg',
        autor: 'admin',
        direccion: 'Km 5 vía al Morro, Yopal'
      }
      // más sitios...
    ];
    this.sitiosFiltrados = [...this.sitios];
  }

filtrarPorMunicipio() {
  if (this.tipoSeleccionado === 'eventos') {
    this.eventosFiltrados = this.municipioSeleccionado
      ? this.eventos.filter(e => e.municipio === this.municipioSeleccionado)
      : [...this.eventos];
  } else {
    this.sitiosFiltrados = this.municipioSeleccionado
      ? this.sitios.filter(s => s.municipio === this.municipioSeleccionado)
      : [...this.sitios];
  }
}

filtrarPorTipo() {
  this.municipioSeleccionado = ''; // reinicia filtro de municipio al cambiar tipo

  if (this.tipoSeleccionado === 'eventos') {
    this.eventosFiltrados = [...this.eventos];
  } else {
    this.sitiosFiltrados = [...this.sitios];
  }
}



  goToPushDeta() {
    this.router.navigate(['/vista2']).then(() => window.scrollTo(0, 0));
  }

  goToPushinicio() {
    this.router.navigate(['/vista']).then(() => window.scrollTo(0, 0));
  }
}
