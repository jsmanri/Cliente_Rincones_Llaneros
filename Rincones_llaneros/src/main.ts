import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/componenteslogin/login/login.component';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './app/pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './app/pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './app/pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './app/pages/componenteturismo/eventos/eventos.component';


bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'politica', component: PoliticaComponent },
            { path: 'recuperacion', component: RecuperacionComponent},
            { path: 'registrositio', component: RegistroComponent},
            { path: 'registroeven', component: EventosComponent},
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));

import { HeadersinregistroComponent } from './app/pages/component/headersinregistro/headersinregistro.component';
import { AppComponent } from './app/app.component';
import { HeaderregistroComponent } from './app/pages/component/headerregistro/headerregistro.component';
import { provideRouter } from '@angular/router';
import { TendenciasComponent } from './app/pages/component/tendencias/tendencias.component';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter([
      { path: '', redirectTo: 'headersinregistro', pathMatch: 'full' },
      { path: 'headersinregistro', component: HeadersinregistroComponent,
        children: [
          { 
            path: 'tendencias', component: TendenciasComponent 
          }
        ]
       },
      { path: 'tendencias', component: TendenciasComponent },
    ])
  ]
})
  .catch(err => console.error(err));

