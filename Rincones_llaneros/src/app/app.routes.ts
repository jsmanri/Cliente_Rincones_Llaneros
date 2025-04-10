import { Routes } from '@angular/router';
import { HeaderregistroComponent } from './pages/component/headerregistro/headerregistro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'headerregistro', pathMatch: 'full' },
    { path: 'headerregistro', component: HeaderregistroComponent },
];
