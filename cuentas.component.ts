import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cuentas.component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cuentas.component.html',
  
}) 

export class CuentasComponent implements AfterViewInit{
  private http = inject(HttpClient);

  ngAfterViewInit() {
    const form = document.getElementById('cuentaForm') as HTMLFormElement;
    const resultado = document.getElementById('resultado') as HTMLDivElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const datos = {
        dpi: (document.getElementById('dpi') as HTMLInputElement).value,
        nombre: (document.getElementById('nombre') as HTMLInputElement).value,
        fechaNacimiento: (document.getElementById('fechaNacimiento') as HTMLInputElement).value,
        direccion: (document.getElementById('direccion') as HTMLInputElement).value,
        tipoCuenta: (document.getElementById('tipoCuenta') as HTMLSelectElement).value
      };

      try{
        await this.http.post('http://localhost:3000/cuenta', datos).toPromise();
        resultado.style.display = 'block';
        resultado.textContent = 'Cuenta registrada exitosamente ';
        form.reset();
      } catch (error) {
        resultado.style.display = 'block';
        resultado.textContent = 'Error al registrar la cuenta ';
        console.error('Error al enviar datos:', error);
      }
    });
    
  }
}
