import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URLS } from '../../../../config/api-config';
import { HttpClient } from '@angular/common/http';

interface Sitio {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  horario: string;
  autor: string;
  categoria: string;
  municipio: string;
  imagen: string;
}

export interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  imagen: string;
  sitio: string;
  autor: string;
  municipio: string;
}

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.css'
})
export class BuscarComponent implements OnInit {
  // Variables generales
  municipios: string[] = [];
  categorias: string[] = [];

  // Sitios
  sitios: Sitio[] = [];
  sitiosFiltrados: Sitio[] = [];

  // Eventos
  eventos: Evento[] = [];
  eventosFiltrados: Evento[] = [];

  // Filtros
  textoBusqueda = '';
  municipioSeleccionado = '';
  categoriaSeleccionada = '';
  mostrarEventos = false; // false: sitios, true: eventos

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.obtenerSitios();
    this.obtenerEventos();
    this.obtenerCategorias();

    this.municipios = [
      "Aguazul", "Chámeza", "Hato Corozal", "Maní", "Monterrey",
      "Nunchía", "Orocue", "Paz de Ariporo", "Pore", "Recetor",
      "Sabanalarga", "San Luis de Palenque", "Tauramena", "Trinidad", "Yopal"
    ];
  }

obtenerSitios() {
  this.http.get<any>('http://localhost:8080/v1/Sitios_Turisticos').subscribe(
    (response) => {
      const sitiosConsultados = response['sitios consultados'];
      if (Array.isArray(sitiosConsultados)) {
        this.sitios = sitiosConsultados.map((sitio: any) => {
          let imagen = 'assets/default.png'; // Imagen por defecto
          try {
            const contenido = sitio.FotoSitio?.trim();


            let fotos: string[] = [];
            if (contenido?.startsWith('"[')) {
              // Si está doblemente stringificado
              fotos = JSON.parse(JSON.parse(contenido));
            } else if (contenido?.startsWith('[')) {
              // Si es un array stringificado
              fotos = JSON.parse(contenido);
            } else if (contenido?.startsWith('data:image')) {
              // Si es un solo string base64
              fotos = [contenido];
            }



            if (fotos.length > 0 && fotos[0].trim() !== '') {
              imagen = fotos[0];
            } else {
              console.log('No hay imagen válida, usando imagen por defecto');
            }
          } catch (error) {
           
          }

          return {
            id: sitio.Id,
            titulo: sitio.NombreSitioTuristico,
            descripcion: sitio.DescripcionSitioTuristico?.replace(/^"|"$/g, '') || '',
            municipio: sitio.IdMunicipio?.NombreMunicipio || '',
            imagen: imagen,
            categoria: sitio.IdCategoria?.Nombre || '',
            direccion: sitio.Ubicacion || '',
            horario: sitio.Horario || '',
            autor: sitio.IdUsuario?.Nombre || ''
          };
        });
        console.log('Sitios obtenidos:', this.sitios);
        this.filtrar(); // Aplicar filtro después de cargar datos
      } else {
        this.sitios = [];
        this.sitiosFiltrados = [];
      }
    },
    (error) => {
      console.error('Error al obtener sitios', error);
      this.sitios = [];
      this.sitiosFiltrados = [];
    }
  );
}



obtenerEventos() {
  this.http.get<any>('http://localhost:8080/v1/Eventos').subscribe(
    (response) => {
      const eventosConsultados = response['eventos consultados'];
      if (Array.isArray(eventosConsultados)) {
        this.eventos = eventosConsultados.map((item: any) => {
          let imagen = 'assets/default.png';  // Imagen por defecto
          try {
            const contenido = item.FotosEvento?.trim();  // Usamos el campo correcto
            console.log('Contenido bruto FotosEvento:', contenido);

            let fotos: string[] = [];
            if (contenido?.startsWith('"[')) {
              fotos = JSON.parse(JSON.parse(contenido));
            } else if (contenido?.startsWith('[')) {
              fotos = JSON.parse(contenido);
            } else if (contenido?.startsWith('data:image')) {
              fotos = [contenido];
            }

            console.log('Fotos parseadas evento:', fotos);

            if (fotos.length > 0 && fotos[0].trim() !== '') {
              imagen = fotos[0];
              console.log('Imagen evento asignada:', imagen);
            } else {
              console.log('No hay imagen válida en evento, usando imagen por defecto');
            }
          } catch (error) {
            console.warn('Error al procesar FotosEvento:', item.FotosEvento, error);
          }

          return {
            id: item.Id,
            titulo: item.NombreEvento,
            descripcion: item.DescripcionEvento,
            fechaInicio: item.FechaHoraInicioEvento,
            fechaFin: item.FechaHoraFinalizacionEvento,
            sitio: item.IdSitioTuristico?.NombreSitioTuristico || '',
            autor: item.IdUsuario?.Nombre || '',
            municipio: item.IdSitioTuristico?.IdMunicipio?.NombreMunicipio || '',
            imagen
          };
        });

        console.log('Eventos obtenidos:', this.eventos);
        this.filtrar(); // Aplicar filtros tras cargar eventos
      } else {
        this.eventos = [];
        console.warn('eventos consultados no es un array:', eventosConsultados);
      }
    },
    (error) => {
      console.error('Error al obtener eventos', error);
      this.eventos = [];
    }
  );
}


  obtenerCategorias() {
    this.http.get<any>(API_URLS.CRUD.Api_crudCategorias).subscribe(
      (data) => {
        const categoriasConsultadas = data['categorias consultadas'];
        if (Array.isArray(categoriasConsultadas)) {
          this.categorias = categoriasConsultadas.map(categoria => categoria.Nombre);
        } else {
          console.error('categorias consultadas no es un array:', categoriasConsultadas);
          this.categorias = [];
        }
      },
      (error) => {
        console.error('Error al obtener categorías', error);
        this.categorias = [];
      }
    );
  }

  filtrar() {
    if (this.mostrarEventos) {
      this.eventosFiltrados = this.eventos.filter(evento => {
        const coincideMunicipio = this.municipioSeleccionado ? evento.municipio === this.municipioSeleccionado : true;
        const coincideTexto = this.textoBusqueda
          ? evento.titulo.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
            evento.descripcion.toLowerCase().includes(this.textoBusqueda.toLowerCase())
          : true;
        return coincideMunicipio && coincideTexto;
      });
      console.log('Eventos filtrados:', this.eventosFiltrados);
    } else {
      this.sitiosFiltrados = this.sitios.filter(sitio => {
        const coincideMunicipio = this.municipioSeleccionado ? sitio.municipio === this.municipioSeleccionado : true;
        const coincideCategoria = this.categoriaSeleccionada ? sitio.categoria === this.categoriaSeleccionada : true;
        const coincideTexto = this.textoBusqueda
          ? sitio.titulo.toLowerCase().includes(this.textoBusqueda.toLowerCase()) ||
            sitio.descripcion.toLowerCase().includes(this.textoBusqueda.toLowerCase())
          : true;
        return coincideMunicipio && coincideCategoria && coincideTexto;
      });
       console.log('Sitios filtrados:', this.sitiosFiltrados);
    }
  }

  limpiarFiltros() {
    this.municipioSeleccionado = '';
    this.categoriaSeleccionada = '';
    this.textoBusqueda = '';
    this.filtrar();
  }

  cambiarFiltro(mostrarEventos: boolean) {
    this.mostrarEventos = mostrarEventos;
    this.limpiarFiltros(); // Limpiar filtros al cambiar tipo
  }

  goToPushDeta() {
    this.router.navigate(['/vista2']).then(() => window.scrollTo(0, 0));
  }

  goToPushinicio() {
    this.router.navigate(['/vista']).then(() => window.scrollTo(0, 0));
  }
}
