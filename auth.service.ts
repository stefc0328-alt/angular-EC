import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';
  
  constructor(private http: HttpClient){}
    /**Inicia sesión y guarda el token en localStorage*/
  login(usuario: string, clave: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { usuario, clave }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }
   /**Cierra sesión eliminando el token*/
  logout(): void {
    localStorage.removeItem('token');
  }
   /** Obtiene el token almacenado*/
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**Verifica si el usuario está logueado*/
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

