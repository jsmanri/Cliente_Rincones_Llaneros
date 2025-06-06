import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ClienteService, VendedorService } from '../../../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vendedor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {
  vendedor: any;
  publicaciones: any[] = [];
  eventos: any[] = [];
  tabActivo: string = 'publicaciones';
  editandoVendedor: boolean = false;

  constructor(private VendedorService: VendedorService, private route: ActivatedRoute, private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.VendedorService.obtenerVendedorPorId(id).subscribe(vendedor => {
      // Ya no se maneja la fotoPerfil ni preview
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

      // Obtener eventos
      this.VendedorService.obtenerEventos(this.vendedor.Id).subscribe(eventos => {
        this.eventos = eventos.map((evento: any) => {
          let fotos: string[] = [];
          if (evento.FotosEvento) {
            try {
              fotos = JSON.parse(evento.FotosEvento);
            } catch (e) {
              console.error('Error al parsear FotoEvento:', e);
            }
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

  cambiarFoto(event: any) {
  const archivo = event.target.files[0];
  if (!archivo) return;

  // 🔁 Limpiar datos anteriores
  this.vendedor.fotoPerfil = '';
  this.vendedor.FotoPreview = '';

  const lector = new FileReader();
  lector.onload = () => {
    const dataUrl = (lector.result as string).trim();

    // ✅ Guardar la imagen completa (incluye encabezado base64)
    this.vendedor.fotoPerfil = dataUrl;

    // 🖼️ Mostrar vista previa (opcional)
    this.vendedor.FotoPreview = dataUrl;
  };

  lector.readAsDataURL(archivo);
  event.target.value = null;
}



  guardarInfoVendedor() {
  const idVendedor = this.vendedor.Id;
  const idCredencial = this.vendedor.IdCredencialesCredenciales?.Id || 1; // credencial para vendedor es 1

  // Preparar los datos actualizados, similar a cliente pero con Rol.Id=1 para vendedor
  const datosActualizados: any = {
  Id: idVendedor,
  Nombre: this.vendedor.Nombre?.trim() || '',
  Correo: this.vendedor.Correo?.trim() || '',
  Cedula: this.vendedor.Cedula?.trim() || '',
  NumeroTelefono: this.vendedor.NumeroTelefono?.trim() || '',
  Activo: this.vendedor.Activo !== undefined ? this.vendedor.Activo : true,
  Rol: { Id: 1 },
  IdCredencialesCredenciales: {
    Id: idCredencial,
    Usuario: this.vendedor.IdCredencialesCredenciales?.Usuario?.trim() || ''
  }
};

// Solo incluir FotoPerfil si fue modificada
if (this.vendedor.fotoPerfil) {
  datosActualizados.FotoPerfil = JSON.stringify([this.vendedor.fotoPerfil]);
}


  this.clienteService.actualizarCliente(idVendedor, datosActualizados).subscribe({
    next: () => {
      alert('Vendedor actualizado correctamente');
      this.editandoVendedor = false;
    },
    error: (err) => {
      console.error('Error al actualizar vendedor:', err);
      alert('Error al actualizar vendedor');
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
  
 mostrarCardPublicar = false;

publicarSitio() {
  this.mostrarCardPublicar = false;
  this.router.navigate(['/crear-sitio']); // Ajusta la ruta según tu configuración
}

publicarEvento() {
  this.mostrarCardPublicar = false;
  this.router.navigate(['/crear-evento']); // Ajusta la ruta según tu configuración
}





  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }
}
