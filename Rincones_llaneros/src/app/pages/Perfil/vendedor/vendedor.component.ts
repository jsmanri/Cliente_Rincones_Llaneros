import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendedor',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './vendedor.component.html',
  styleUrl: './vendedor.component.css'
})
export class VendedorComponent  {
  nombre: string = 'Anna Smith';
  tabActivo: string = 'publicaciones';

  seguir() {
    alert('Has seguido a ' + this.nombre);
  }

  cambiarTab(tab: string) {
    this.tabActivo = tab;
  }
}
