import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/componenteslogin/login/login.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './app/pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './app/pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './app/pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './app/pages/componenteturismo/eventos/eventos.component';
import { HeadersinregistroComponent } from './app/pages/component/headersinregistro/headersinregistro.component';
import { HeaderregistroComponent } from './app/pages/component/headerregistro/headerregistro.component';
import { TendenciasComponent } from './app/pages/component/tendencias/tendencias.component';
import { VistaComponent } from './app/pages/componets/vista/vista.component';
import { Vista2Component } from './app/pages/componets/vista2/vista2.component';
import { UsuariosadminComponent } from './app/pages/componenteadmin/usuariosadmin/usuariosadmin.component';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MapaComponent } from './app/pages/componenteturismo/mapa/mapa.component';
import { DetallesComponent } from './app/pages/componets/detalles/detalles.component';
import { InfoSitioComponent } from './app/pages/component/info-sitio/info-sitio.component';
import { ClienteComponent } from './app/pages/Perfil/cliente/cliente.component';
import { VendedorComponent } from './app/pages/Perfil/vendedor/vendedor.component';
import { BuscarComponent } from './app/pages/componets/buscar/buscar.component';


bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'homesinregistro', pathMatch: 'full' },
            { path: 'homesinregistro', component: HeadersinregistroComponent,
              children: [
                { 
                  path: 'tendencias', component: TendenciasComponent 
                },
                { 
                  path: '', component: VistaComponent
                },
                { 
                  path: 'vista2', component: Vista2Component 
                },
                {
                  path: 'info-sitio/:id', component: InfoSitioComponent
                },
                {
                  path: 'Buscar', component: BuscarComponent
                },
                
              ]
             },
             { path: 'home', component: HeaderregistroComponent,
              children: [
                { 
                  path: '', component: VistaComponent
                },
                { 
                  path: 'cliente', component: ClienteComponent
                },
                { 
                  path: 'vendedor', component: VendedorComponent
                },
                {
                  path: 'tendencias', component: TendenciasComponent
                },
                { 
                  path: 'registrositio', component: RegistroComponent
                },
                {
                  path: 'buscar', component: BuscarComponent
                },
                { 
                  path: 'vendedor/:id', component: VendedorComponent
                },
                {
                  path: 'cliente/:id', component: ClienteComponent
                },
                {
                  path: 'info-sitio/:id', component: InfoSitioComponent
                },
                {
                 path: 'registroeven', component: EventosComponent
                }
              ]
              },
             { path: 'login', component: LoginComponent },
             { path: 'register', component: RegisterComponent },
             { path: 'politica', component: PoliticaComponent },
             { path: 'recuperacion', component: RecuperacionComponent},
             { path: 'usuadmin', component: UsuariosadminComponent},
             { path: 'adminmapa', component: MapaComponent},
             { path: 'vista', component: VistaComponent },
             { path: 'detalles', component: DetallesComponent },
             { path: 'eventos', component: EventosComponent},
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));