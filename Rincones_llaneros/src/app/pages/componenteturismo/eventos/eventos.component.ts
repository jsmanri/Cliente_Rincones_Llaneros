import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent {
  eventoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.eventoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      inicio: [''],
      fin: ['']
    });
  }

  onSubmit(): void {
    if (this.eventoForm.valid) {
      console.log('Datos del evento:', this.eventoForm.value);
      // Aquí puedes enviar los datos a tu backend o servicio
    } else {
      console.log('Formulario inválido');
    }
  }
}
