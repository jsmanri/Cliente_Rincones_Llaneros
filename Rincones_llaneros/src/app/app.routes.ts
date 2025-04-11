import { Routes } from '@angular/router';
import { HeadersinregistroComponent } from './pages/component/headersinregistro/headersinregistro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'headersinregistro', pathMatch: 'full' },
    { path: 'headersinregistro', component: HeadersinregistroComponent },
];
