import { bootstrapApplication } from '@angular/platform-browser';
import { HeadersinregistroComponent } from './app/pages/component/headersinregistro/headersinregistro.component';
import { AppComponent } from './app/app.component';
import { HeaderregistroComponent } from './app/pages/component/headerregistro/headerregistro.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent,{
  providers:[
    provideRouter([
      { path: '', redirectTo: 'headerregistro', pathMatch: 'full' },
      { path: 'headerregistro', component: HeaderregistroComponent },
    ])
  ]
})
  .catch(err => console.error(err));
