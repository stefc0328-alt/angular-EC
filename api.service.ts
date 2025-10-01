import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class formService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  
  crearCuenta(datos: any ): Observable <any>{
    return this.http.post(`${this.baseUrl}/cuenta`, datos);
  }
  registrarTransaccion(datos:any): Observable<any>{
    return this.http.post (`${this.baseUrl}/transacciones`, datos);
  }
}
