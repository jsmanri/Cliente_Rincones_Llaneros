import { Routes } from '@angular/router';
import { HeadersinregistroComponent } from './pages/component/headersinregistro/headersinregistro.component';
import { TendenciasComponent } from './pages/component/tendencias/tendencias.component';
import { LoginComponent } from './pages/componenteslogin/login/login.component';
import { RegisterComponent } from './pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './pages/componenteturismo/eventos/eventos.component';
import { VistaComponent } from './pages/componets/vista/vista.component';
import { Vista2Component } from './pages/componets/vista2/vista2.component';

export const routes: Routes = [
    { path: '', redirectTo: 'headersinregistro/vista', pathMatch: 'full' },
    { path: 'vista', component:VistaComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'politica', component:PoliticaComponent},
    { path: 'recuperacion', component:RecuperacionComponent },
    { path: 'registrossitio', component:RegistroComponent},
    { path: 'registroeven', component:EventosComponent},
    { path: 'headersinregistro', component: HeadersinregistroComponent },
    { path: 'tendencias', component: TendenciasComponent },
    { path: 'vista', component:VistaComponent},
    { path: 'vista2', component:Vista2Component}
];

