import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vista2',
  imports: [
    CommonModule
  ],
  templateUrl: './vista2.component.html',
  styleUrl: './vista2.component.css'
})
export class Vista2Component {
  scrollTo(elementId: string) {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  

}
