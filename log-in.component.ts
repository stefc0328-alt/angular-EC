import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  formLogin: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.formLogin = this.fb.group({
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
  onLogin(): void {
    if (this.formLogin.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos';
      return;
    }

    const { usuario, clave } = this.formLogin.value;

    this.authService.login(usuario, clave).subscribe({
      next: () => {
        console.log('Login exitoso, token guardado');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error en login:', err);
        if (err.status === 401) {
          this.errorMessage = 'Credenciales incorrectas';
        } else {
          this.errorMessage = 'Error en el servidor';
        }
      }
    });
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
  goBack(): void {
    this.router.navigate(['/']);
  }
}
