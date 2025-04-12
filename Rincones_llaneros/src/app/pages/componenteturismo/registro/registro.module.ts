import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroSitioComponent } from './registro.component'; // Ajusta la ruta si es necesario

@NgModule({
  declarations: [RegistroSitioComponent],
  imports: [CommonModule, FormsModule],
  exports: [RegistroSitioComponent]
})
export class RegistroModule {}