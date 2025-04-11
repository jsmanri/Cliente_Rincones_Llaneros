import { bootstrapApplication } from '@angular/platform-browser';
import { VistaComponent } from './app/pages/componets/vista/vista.component';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { Vista2Component } from './app/pages/componets/vista2/vista2.component';


bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'vista', component: VistaComponent },
            { path: 'vista2', component: Vista2Component },
          ]),
        provideHttpClient()
    ]
}).catch(err => console.error(err));