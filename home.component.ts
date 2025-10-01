import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { Route } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template:`
<style>
   body {
      font-family: Arial, sans-serif;
      background: #f4f6f9;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    form {
      background: #fff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0px 4px 8px rgba(0,0,0,0.2);
      width: 320px;
    }
    h2 {
      text-align: center;
      margin-bottom: 15px;
      color: #333;
    }
    label {
      display: block;
      margin-top: 10px;
      font-weight: bold;
    }
    input, select, button {
      width: 100%;
      padding: 8px;
      margin-top: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    div{
      border-radius: 15px;
      font-size: 15px;
      
    }
    button {
      background: #a74caf;
      color: white;
      font-weight: bold;
      cursor: pointer;
      margin-top: 15px;
    }
    button:hover {
      background: #6d1b5b;
    }
    .resultado {
      margin-top: 15px;
      padding: 10px;
      background: #eaf7ea;
      border: 1px solid #c1e1c1;
      border-radius: 6px;
      color: #642d66;
      font-size: 14px;
 

    }
</style>
<form>
<h2>Bienvenido a Cuenta App</h2>
<p>¿Que deseas hacer?</p>
      <button routerLink="/cuentas">Cuentas</button>
      <button routerLink="/transacciones">Transacciones</button>
      <h4> <div (click)="logout()" style="cursor: pointer;"> Cerrar Sesión </div> </h4> 
      
    <router-outlet></router-outlet>
</form>
  `

})
export class HomeComponent {
    constructor(private authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout(); // Borra el token
    this.router.navigate(['/login']); // Redirige al login
  }
}
