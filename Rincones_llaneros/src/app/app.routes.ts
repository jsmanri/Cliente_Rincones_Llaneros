import { Routes } from '@angular/router';
import { HeadersinregistroComponent } from './pages/component/headersinregistro/headersinregistro.component';
import { TendenciasComponent } from './pages/component/tendencias/tendencias.component';
import { LoginComponent } from './pages/componenteslogin/login/login.component';
import { RegisterComponent } from './pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './pages/componenteturismo/eventos/eventos.component';
import { UsuariosadminComponent } from './pages/componenteadmin/usuariosadmin/usuariosadmin.component';


export const routes: Routes = [
    { path: '', component:LoginComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'politica', component:PoliticaComponent},
    { path: 'recuperacion', component:RecuperacionComponent },
    { path: 'registrossitio', component:RegistroComponent},
    { path: 'registroeven', component:EventosComponent},
    { path: '', redirectTo: 'headersinregistro', pathMatch: 'full' },
    { path: 'headersinregistro', component: HeadersinregistroComponent },
    { path: 'tendencias', component: TendenciasComponent },
    { path: 'usuadmin', component: UsuariosadminComponent},
];


