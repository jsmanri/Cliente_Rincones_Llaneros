import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/componenteslogin/login/login.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { RegisterComponent } from './app/pages/componenteslogin/register/register.component';
import { PoliticaComponent } from './app/pages/componenteslogin/politica/politica.component';
import { RecuperacionComponent } from './app/pages/componenteslogin/recuperacion/recuperacion.component';


bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'politica', component: PoliticaComponent },
            { path: 'recuperacion', component: RecuperacionComponent}
          ]),
        provideAnimations(),
        provideHttpClient()
    ]
}).catch(err => console.error(err));