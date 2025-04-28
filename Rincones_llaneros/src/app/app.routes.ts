import { Routes } from '@angular/router';
import { VistaComponent } from './pages/componets/vista/vista.component';
import { Vista2Component } from './pages/componets/vista2/vista2.component';
import { DetallesComponent } from './pages/componets/detalles/detalles.component';

export const routes: Routes = [
    {path: '', component:VistaComponent},
    {path: 'vista2', component:Vista2Component},
    {path: 'detalles', component:DetallesComponent}
];
