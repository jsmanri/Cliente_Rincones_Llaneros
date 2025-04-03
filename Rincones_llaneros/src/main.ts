import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/pages/login/login.component';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter([
      { path: '',redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent }
    ]),
    provideHttpClient(),
    provideAnimations()
  ]
})
  .catch((err) => console.error(err));
