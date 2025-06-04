import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { VendedorService } from '../../../../services/api.service';

@Component({
  selector: 'app-vendedor',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './vendedor.component.html',
  styleUrl: './vendedor.component.css'
})
export class VendedorComponent implements OnInit {
  vendedor: any;
  publicaciones: any[] = [];
  eventos: any[] = [];
  tabActivo: string = 'publicaciones';
  editandoVendedor: boolean = false;

  constructor(private VendedorService: VendedorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.VendedorService.obtenerVendedorPorId(id).subscribe(vendedor => {
      this.vendedor = vendedor;

      // Obtener sitios turísticos
      this.VendedorService.obtenerPublicaciones(this.vendedor.Id).subscribe(publicaciones => {
        this.publicaciones = publicaciones.map((publicacion: any) => {
          let fotos: string[] = [];
          try {
            fotos = JSON.parse(publicacion.FotoSitio);
          } catch (e) {
            console.error('Error al parsear FotoSitio:', e);
          }
          return {
            ...publicacion,
            Fotos: fotos
          };
        });
      });

      // ✅ Obtener eventos correctamente
      this.VendedorService.obtenerEventos(this.vendedor.Id).subscribe(eventos => {
  this.eventos = eventos.map((evento: any) => {
    let fotos: string[] = [];
    if (evento.FotosEvento) {
      try {
        fotos = JSON.parse(evento.FotosEvento);
        console.log('Fotos parseadas evento:', fotos);
      } catch (e) {
        console.error('Error al parsear FotoEvento:', e, evento.FotoEvento);
      }
    } else {
      console.log('Evento sin FotosEvento:', evento);
    }
    return {
      ...evento,
      Fotos: fotos
    };
  });
});

    });
  }

  guardarCambios(sitio: any) {
    this.VendedorService.updateSitioTuristico(sitio.Id, sitio).subscribe({
      next: () => {
        sitio.editando = false;
        alert('Sitio actualizado correctamente.');
      },
      error: (err) => {
        console.error(err);
        alert('Hubo un error al actualizar el sitio.');
      }
    });
  }

  procesarImagen(event: any, sitio: any) {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      const base64 = lector.result as string;
      sitio.Fotos = [base64];
      sitio.FotoSitio = JSON.stringify(sitio.Fotos);
    };

    if (archivo) lector.readAsDataURL(archivo);
  }

  eliminarPublicacion(sitio: any) {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta publicación?');
    if (confirmar) {
      this.VendedorService.deleteSitioTuristico(sitio.Id).subscribe({
        next: () => {
          this.publicaciones = this.publicaciones.filter(p => p !== sitio);
          alert('Publicación eliminada con éxito.');
        },
        error: (err) => {
          console.error(err);
          alert('Hubo un error al eliminar la publicación.');
        }
      });
    }
  }

  guardarCambiosEvento(evento: any) {
    this.VendedorService.updateEvento(evento.Id, evento).subscribe({
      next: () => {
        evento.editando = false;
        alert('Evento actualizado correctamente.');
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar el evento.');
      }
    });
  }

  procesarImagenEvento(event: any, evento: any) {
    const archivo = event.target.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      const base64 = lector.result as string;
      evento.Fotos = [base64];
      evento.FotoEvento = JSON.stringify(evento.Fotos);
    };

    if (archivo) lector.readAsDataURL(archivo);
  }

  guardarInfoVendedor() {
    const datosActualizados = {
      Nombre: this.vendedor.Nombre,
      Correo: this.vendedor.Correo,
      Rol: this.vendedor.Rol?.Id || 1,
      Id_Credenciales: this.vendedor.IdCredencialesCredenciales?.Id || 3
    };


    this.VendedorService.updateVendedorDesdeMid(this.vendedor.Id, datosActualizados).subscribe({
      next: () => alert('Información del vendedor actualizada correctamente.'),
      error: err => {
        console.error(err);
        alert('Error al actualizar la información del vendedor.');
      }
    });
  }


  eliminarEvento(evento: any) {
  if (confirm(`¿Seguro que quieres eliminar el evento "${evento.NombreEvento}"?`)) {
    this.VendedorService.deleteEvento(evento.Id).subscribe({
      next: () => {
        this.eventos = this.eventos.filter(e => e.Id !== evento.Id);
      },
      error: (err) => {
        console.error('Error al eliminar evento', err);
        alert('No se pudo eliminar el evento');
      }
    });
  }
}

  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }
}
