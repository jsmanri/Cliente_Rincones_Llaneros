import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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
    obtenerSitioPorId(id: number): Observable<any> {
    return this.http.get<any>(`/api/sitios-turisticos/${id}`);
  }
}