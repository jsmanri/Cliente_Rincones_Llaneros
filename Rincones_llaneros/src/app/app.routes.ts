import { Routes } from '@angular/router';
import { LoginComponent } from './pages/componenteslogin/login/login.component';
import { RegisterComponent } from './pages/componenteslogin/register/register.component';

export const routes: Routes = [
    {path: '', component:LoginComponent},
    {path: 'register', component:RegisterComponent}
];