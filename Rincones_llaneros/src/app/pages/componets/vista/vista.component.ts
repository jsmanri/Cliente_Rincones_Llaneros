import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista',
  imports: [],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {
  constructor(private router:Router){}
  
  goToPush(){
    this.router.navigate(['/vista2'])
  }
  
}

