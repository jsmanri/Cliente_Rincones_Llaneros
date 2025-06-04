import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map} from "rxjs";
import { API_URLS } from "../config/api-config";



@Injectable ({
    providedIn: 'root'

})
/*metodo get general*/

export class ApiService{
    constructor (private http: HttpClient){}

    get<T>(url: string): Observable <T>{
        return this.http.get<T>(url);
    }

    post<T> (url: string, data:any): Observable<T>{
        return this.http.post<T>(url, data);
    } 

    put<T> (url: string, data:any): Observable<T>{
        return this.http.put<T>(url, data);

    }
    delete<T> (url:string): Observable<T>{
        return this.http.delete<T>(url);
    }
    
    patch<T>(url: string, body: any): Observable<T> {
        return this.http.patch<T>(url, body);
    }
}


@Injectable({
  providedIn: 'root'
})
export class VendedorService {
   private usuariosUrl = API_URLS.CRUD.Api_crudUsuarios;
  private sitiosUrl = API_URLS.CRUD.Api_crudSitios;
  private eventosUrl = API_URLS.CRUD.Api_crudEventos

  constructor(private http: HttpClient) {}

  obtenerVendedorPorId(id: number): Observable<any> {
    return this.http.get<any>(this.usuariosUrl).pipe(
      map(res => {
        const vendedores = res['usuarios consultados'] || [];
        const vendedor = vendedores.find((u: any) => u.Id === id && u.Rol?.Id === 1);
        if (vendedor?.FotoPerfil) {
          try {
            vendedor.FotoPerfil = JSON.parse(vendedor.FotoPerfil);
          } catch (_) {
            vendedor.FotoPerfil = null;
          }
        }
        return vendedor;
      })
    );
  }

  updateSitioTuristico(id: number, sitio: any) {
  return this.http.put(`${API_URLS.CRUD.Api_crudSitios}/${id}`, sitio);
}

obtenerPublicaciones(idVendedor: number): Observable<any[]> {
  return this.http.get<any>(`${this.sitiosUrl}`).pipe(
    map(res => {
      const todosLosSitios = res['sitios consultados'] || [];
      // Filtrar por ID del usuario que publicó el sitio
      return todosLosSitios.filter((s: any) => s.IdUsuario?.Id === idVendedor);
    })
  );
}
  deleteSitioTuristico(id: number) {
    const url = `${API_URLS.CRUD.Api_crudSitios}/${id}`;
    return this.http.delete(url);
  }

updateVendedorDesdeMid(id: number, datos: any) {
  return this.http.put(`${API_URLS.Mid.Api_midPutU}/${id}`, datos);
}

obtenerEventos(idVendedor: number): Observable<any[]> {
  return this.http.get<any>(`${this.eventosUrl}`).pipe(
    map(res => {
      const todosLosEventos = res['eventos consultados'] || [];
      return todosLosEventos.filter((e: any) => e.IdUsuario?.Id === idVendedor);
    })
  );
}


updateEvento(id: number, datos: any) {
  return this.http.put(`${API_URLS.CRUD.Api_crudEventos}/${id}`, datos);
}
deleteEvento(id: number) {
    const url = `${API_URLS.CRUD.Api_crudEventos}/${id}`;
    return this.http.delete(url);
  }




}


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http: HttpClient) {} 

obtenerClientePorId(id: number): Observable<any> {
  const url = `${API_URLS.CRUD.Api_crudUsuarios}/${id}`;
  return this.http.get<any>(url).pipe(
    map(res => {
      console.log('Respuesta completa:', res);
      let cliente = res['usuario consultados'];

      console.log('Rol del cliente:', cliente?.Rol);
      console.log('ID del rol:', cliente?.Rol?.Id, 'Tipo:', typeof cliente?.Rol?.Id);

      // Validar que tenga rol de cliente (Id == 2)
      if (parseInt(cliente?.Rol?.Id, 10) !== 2) {
        console.warn('El usuario no es un cliente.');
        return null;
      }

      // Parsear FotoPerfil si es string
      if (cliente?.FotoPerfil && typeof cliente.FotoPerfil === 'string') {
        try {
          cliente.FotoPerfil = JSON.parse(cliente.FotoPerfil);
        } catch (_) {
          cliente.FotoPerfil = null;
        }
      }

      console.log('Cliente encontrado:', cliente);
      return cliente;
    })
  );
}




}



