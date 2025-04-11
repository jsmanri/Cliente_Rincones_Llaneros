import { bootstrapApplication } from '@angular/platform-browser';
import { HeadersinregistroComponent } from './app/pages/component/headersinregistro/headersinregistro.component';
import { AppComponent } from './app/app.component';
import { HeaderregistroComponent } from './app/pages/component/headerregistro/headerregistro.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter([
      { path: '', redirectTo: 'headersinregistro', pathMatch: 'full' },
      { path: 'headersinregistro', component: HeadersinregistroComponent },
    ])
  ]
})
  .catch(err => console.error(err));
