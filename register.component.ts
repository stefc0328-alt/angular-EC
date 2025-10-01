import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
    formRegister: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      usuario: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(\w+|\w+@\w+\.\w{2,})$/) // nombre o email
        ]
      ],
      clave: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });
  }
   onRegister(): void {
    const datos = this.formRegister.value;
    this.http.post('http://localhost:3000/usuario', datos).subscribe({
      next: () => {
        alert('Usuario registrado con éxito');
        this.router.navigate(['/login']); // Ir al login después de registrarse
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/']); // o '/welcome' si así se llama tu ruta
  }
  
}


