import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/componenteslogin/login/login.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './app/pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './app/pages/componenteslogin/recuperacion/recuperacion.component';
import { RegistroComponent } from './app/pages/componenteturismo/registro/registro.component';
import { EventosComponent } from './app/pages/componenteturismo/eventos/eventos.component';
import { UsuariosadminComponent } from './app/pages/componenteadmin/usuariosadmin/usuariosadmin.component';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { SitiosadminComponent } from './app/pages/componenteadmin/sitiosadmin/sitiosadmin.component';


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
            { path: 'usuadmin', component: UsuariosadminComponent},
            { path: 'sitiosadmin',component: SitiosadminComponent}
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));


