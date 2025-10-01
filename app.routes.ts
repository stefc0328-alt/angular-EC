import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component/welcome.component';
import { RegisterComponent } from './register/register.component';
import { LogInComponent } from './log-in/log-in.component';
import {HomeComponent} from './home/home.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'', component: WelcomeComponent},
    {path:'register', component: RegisterComponent},
    {path: 'login', component: LogInComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'cuentas', component: CuentasComponent, canActivate: [AuthGuard]},
    {path: 'transacciones', component:TransaccionesComponent, canActivate: [AuthGuard]}
];



