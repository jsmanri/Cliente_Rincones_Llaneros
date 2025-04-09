import { bootstrapApplication } from '@angular/platform-browser';
import { VistaComponent } from './app/pages/vista/vista.component';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent,{
    providers:[
        provideRouter([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'vista', component: VistaComponent },
          ]),
        provideHttpClient()
    ]
}).catch(err => console.error(err));