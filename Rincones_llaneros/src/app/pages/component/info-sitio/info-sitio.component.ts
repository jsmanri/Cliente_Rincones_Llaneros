import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { API_URLS } from '../../../../config/api-config';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MapaRutaComponent } from '../mapa-ruta/mapa-ruta.component'; // Importa el nuevo componente de mapa
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-info-sitio',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    HttpClientModule,
    MatInputModule,
    MatProgressSpinnerModule, // Importa el módulo del spinner
    MatDialogModule,
  ],
  templateUrl: './info-sitio.component.html',
  styleUrls: ['./info-sitio.component.css']
})
export class InfoSitioComponent implements OnInit, OnDestroy {
  sitio: any;
  cargando = true; // Variable para controlar el estado de carga
  usuarioAutenticado = false; // Variable para verificar si el usuario ha iniciado sesión
  intervaloCarrusel: any;
  imagenActual = 0;
  imagenSeleccionada: string | null = null;
  modalVisible = false;
  modalTransporteVisible = false;

  nuevoComentario = {
    texto: '',
    valoracion: 0
  };

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private dialog: MatDialog) {}

ngOnInit(): void {
  // Verificar si el usuario ha iniciado sesión
  this.usuarioAutenticado = !!localStorage.getItem('usuarioId'); // 🔹 Cambiar a 'usuarioId'

  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.apiService.get<any>(`${API_URLS.Mid.Api_Infositio}/${id}`).subscribe({
      next: (response) => {
        const datos = response.resultado;

        let imagenes: string[] = [];
        try {
          const contenido = datos.Fotositio?.trim();
          if (contenido?.startsWith('"[')) {
            imagenes = JSON.parse(JSON.parse(contenido));
          } else if (contenido?.startsWith('[')) {
            imagenes = JSON.parse(contenido);
          } else if (contenido?.startsWith('data:image')) {
            imagenes = [contenido];
          }
        } catch (e) {
          console.warn('Error al procesar Fotositio:', datos.Fotositio);
        }

        this.sitio = {
          id: datos.Id_Sitio,
          nombre: datos.Nombre,
          descripcion: datos.Descripcion,
          valoracion: Math.round(datos.Ponderacion * 10) / 10,
          comentarios: datos.Comentarios || [],
          imagenes: imagenes,
          lat: datos.Latitud,
          lng: datos.Longitud,
          direccion: datos.Ubicacion,
          horario: datos.Horario,
          telefono: datos.Telefono,
          transporte: datos.Transporte || {}
        };

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar el sitio:', err);
        this.cargando = false;
      }
    });
  }
  this.iniciarCarruselAutomatico();
}


  ngOnDestroy(): void {
    clearInterval(this.intervaloCarrusel);
  }

  iniciarCarruselAutomatico(): void {
    this.intervaloCarrusel = setInterval(() => {
      this.siguienteImagen();
    }, 3500);
  }

  seleccionarEstrellas(valor: number) {
    this.nuevoComentario.valoracion = valor;
  }

 enviarComentario() {
  if (!this.usuarioAutenticado) {
    alert('Debes iniciar sesión para agregar comentarios.');
    return;
  }

  if (!this.nuevoComentario.texto || this.nuevoComentario.valoracion === 0) {
    alert('Por favor, escribe un comentario y selecciona una puntuación.');
    return;
  }

  const comentario = {
  IdSitiosTuristicos: { Id: this.sitio.id }, // 🔹 Ahora se envía correctamente como objeto
  IdUsuario: { Id: Number(localStorage.getItem('usuarioId')) }, // 🔹 Usuario autenticado
  Comentario: this.nuevoComentario.texto,
  Calificacion: String(this.nuevoComentario.valoracion), // 🔹 Convertido a string
  Activo: true // 🔹 Asegura que el comentario sea marcado como activo
};

console.log('📌 Enviando comentario al CRUD:', comentario); // 📌 Verifica la estructura antes de enviar

this.apiService.post<any>(API_URLS.CRUD.Api_Comentarios, comentario).subscribe({
  next: (response) => {
    console.log('✅ Respuesta del CRUD:', response); // 📌 Verifica que el backend lo acepte correctamente

    // 📌 Agregar el comentario visualmente
    const nuevo = {
      autor: comentario.IdUsuario.Id,
      texto: comentario.Comentario,
      calificacion: comentario.Calificacion
    };

    this.sitio.comentarios.push(nuevo); 

    this.nuevoComentario = { texto: '', valoracion: 0 };
    alert('Comentario enviado con éxito');
  },
  error: (err) => {
    console.error('❌ Error al enviar comentario al CRUD:', err);
    alert('Hubo un error al guardar el comentario');
  }
});

}


  iniciarSesion() {
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }

  anteriorImagen() {
    if (this.sitio?.imagenes?.length > 0) {
      this.imagenActual =
        (this.imagenActual - 1 + this.sitio.imagenes.length) % this.sitio.imagenes.length;
    }
  }

  siguienteImagen() {
    if (this.sitio?.imagenes?.length > 0) {
      this.imagenActual =
        (this.imagenActual + 1) % this.sitio.imagenes.length;
    }
  }

  getEstrellasArray(valoracion: number): string[] {
    const estrellas: string[] = [];
    const enteras = Math.floor(valoracion);
    const decimal = valoracion - enteras;

    for (let i = 0; i < enteras; i++) {
      estrellas.push('star');
    }

    if (decimal >= 0.25 && decimal < 0.75) {
      estrellas.push('star_half');
    } else if (decimal >= 0.75) {
      estrellas.push('star');
    }

    while (estrellas.length < 5) {
      estrellas.push('star_border');
    }

    return estrellas;
  }

  abrirImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
    this.modalVisible = true;
    clearInterval(this.intervaloCarrusel);
  }

  cerrarModal() {
    this.modalVisible = false;
  }

abrirModalTransporte() {
  if (!this.sitio.lat || !this.sitio.lng) {
    console.error('Ubicación del sitio no está definida correctamente.');
    return;
  }

  const dialogRef = this.dialog.open(MapaRutaComponent, {
    width: '700px',
    height: '500px',
    disableClose: false,
    data: { sitioUbicacion: { lat: this.sitio.lat, lng: this.sitio.lng } }
  });

  dialogRef.componentInstance.ubicacionUsuario.subscribe((coords: { lat: number; lng: number }) => {
    console.log('Ubicación del usuario:', coords);
  });
}

  cerrarModalTransporte() {
    this.modalTransporteVisible = false;
  }
}