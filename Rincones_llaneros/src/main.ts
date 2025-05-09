import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/componenteslogin/login/login.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
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
import { ClienteComponent } from './app/pages/component/perfil/cliente/cliente.component';
import { VendedorComponent } from './app/pages/component/perfil/vendedor/vendedor.component';



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
                }
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
                }
              ]
              },
             { path: 'login', component: LoginComponent },
             { path: 'register', component: RegisterComponent },
             { path: 'politica', component: PoliticaComponent },
             { path: 'recuperacion', component: RecuperacionComponent},
             { path: 'registrositio', component: RegistroComponent},
             { path: 'registroeven', component: EventosComponent}
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));

