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
import { ActivatedRoute } from '@angular/router';

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
    MatInputModule
  ],
  templateUrl: './info-sitio.component.html',
  styleUrl: './info-sitio.component.css'
})
export class InfoSitioComponent implements OnInit, OnDestroy {
  sitio: any;
  imagenActual: number = 0;
  intervaloCarrusel: any;
  imagenSeleccionada: string = '';
  modalVisible: boolean = false;
  modalTransporteVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.apiService.obtenerSitioPorId(id).subscribe((data) => {
        this.sitio = data;
        this.iniciarCarruselAutomatico();
      });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervaloCarrusel);
  }

  iniciarCarruselAutomatico(): void {
    this.intervaloCarrusel = setInterval(() => {
      this.siguienteImagen();
    }, 4000);
  }

  nuevoComentario = {
    texto: '',
    valoracion: 0
  };

  seleccionarEstrellas(valor: number) {
    this.nuevoComentario.valoracion = valor;
  }

  enviarComentario() {
    if (!this.nuevoComentario.texto || this.nuevoComentario.valoracion === 0) {
      alert('Por favor, escribe un comentario y selecciona una puntuación.');
      return;
    }

    const nuevo = {
      autor: 'Usuario',
      texto: this.nuevoComentario.texto,
      valoracion: this.nuevoComentario.valoracion
    };

    this.sitio.comentarios.push(nuevo);
    this.nuevoComentario = { texto: '', valoracion: 0 };
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
    this.iniciarCarruselAutomatico();
  }

  abrirModalTransporte() {
    this.modalTransporteVisible = true;
  }

  cerrarModalTransporte() {
    this.modalTransporteVisible = false;
  }
}