import { Routes } from '@angular/router';
import { HeadersinregistroComponent } from './pages/component/headersinregistro/headersinregistro.component';
import { TendenciasComponent } from './pages/component/tendencias/tendencias.component';

export const routes: Routes = [
    { path: '', redirectTo: 'headersinregistro', pathMatch: 'full' },
    { path: 'headersinregistro', component: HeadersinregistroComponent },
    { path: 'tendencias', component: TendenciasComponent },
];
