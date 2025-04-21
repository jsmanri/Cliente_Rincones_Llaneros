import { Routes } from '@angular/router';
import { LoginComponent } from './pages/componenteslogin/login/login.component';
import { RegisterComponent } from './pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './pages/componenteturismo/registro/registro.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'register', component:RegisterComponent},
    {path: 'politica', component:PoliticaComponent},
    {path: 'recuperacion', component:RecuperacionComponent },
    {path: 'registrossitio', component:RegistroComponent}
];