import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeadersinregistroComponent } from './pages/component/headersinregistro/headersinregistro.component';
import { TendenciasComponent } from './pages/component/tendencias/tendencias.component';
import { RegisterComponent } from './pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './pages/componenteturismo/eventos/eventos.component';
import { VistaComponent } from './pages/componets/vista/vista.component';
import { Vista2Component } from './pages/componets/vista2/vista2.component';
import { ClienteComponent } from './pages/component/perfil/cliente/cliente.component';
import { VendedorComponent } from './pages/component/perfil/vendedor/vendedor.component';
import { HeaderregistroComponent } from './pages/component/headerregistro/headerregistro.component';
import { UsuariosadminComponent } from './pages/componenteadmin/usuariosadmin/usuariosadmin.component';
import { SitiosadminComponent } from './pages/componenteadmin/sitiosadmin/sitiosadmin.component';
import { DetallesComponent } from './pages/componets/detalles/detalles.component';
import { InfoSitioComponent } from './pages/component/info-sitio/info-sitio.component';


export const routes: Routes = [
    { path: '', redirectTo: 'homesinregistro', pathMatch: 'full' },
    { path: 'vista', component:VistaComponent},
    { path: 'register', component:RegisterComponent},
    { path: 'politica', component:PoliticaComponent},
    { path: 'recuperacion', component:RecuperacionComponent },
    { path: 'registrossitio', component:RegistroComponent},
    { path: 'registroeven', component:EventosComponent},
    { path: 'home', component:HeaderregistroComponent},
    { path: 'homesinregistro', component: HeadersinregistroComponent },
    { path: 'tendencias', component: TendenciasComponent },
    { path: 'vista2', component:Vista2Component},
    { path: 'cliente', component: ClienteComponent},
    { path: 'vendedor', component: VendedorComponent},
    { path: 'usuadmin', component: UsuariosadminComponent},
    { path: 'sitiosadmin', component: SitiosadminComponent},
    { path: 'detalles', component:DetallesComponent},
    { path: 'info-sitio/:id', component: InfoSitioComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
