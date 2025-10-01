import { AfterViewInit, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transacciones.component',
  standalone: true, 
  imports: [RouterModule],
  templateUrl: './transacciones.component.html',

})

export class TransaccionesComponent implements AfterViewInit{
  private http = inject(HttpClient);

ngAfterViewInit() {
    const form = document.getElementById('transaccionForm') as HTMLFormElement; 
    const resultado = document.getElementById('resultado') as HTMLDivElement;

    form.addEventListener('submit', async(e) => {
      e.preventDefault();
      const datos = {
        idCliente: (document.getElementById('idCliente') as HTMLInputElement).value,
        cuenta:(document.getElementById('cuenta') as HTMLInputElement).value,
        tipoOperacion: (document.getElementById('tipoOperacion') as HTMLSelectElement).value, 
        monto:parseFloat((document.getElementById('monto') as HTMLInputElement).value)
      };
      try{
        await this.http.post('http://localhost:3000/transacciones', datos).toPromise();
        resultado.style.display = 'block';
        resultado.textContent = 'Transaccion realizada exitosamente ';
        form.reset();
      } catch (error) {
        resultado.style.display = 'block';
        resultado.textContent = 'Error al realizar la transaaccion ';
        console.error('Error al enviar datos:', error);
      }
    });
  }
}
