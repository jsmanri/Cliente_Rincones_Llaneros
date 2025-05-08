import { Component,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'

@Component({
  selector: 'app-vista',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './vista.component.html',
  styleUrl: './vista.component.css'
})
export class VistaComponent {
  constructor(private router:Router){}
  
  goToPush() {
    this.router.navigate(['/vista2']).then(() => {
      window.scrollTo(0, 0);
    });
  }

  currentIndexTestimonios=0;
  currentIndex=0;


  @ViewChild('scrollContainer',{static:true}) scrollContainer!: ElementRef;

  sectionTitle='Eventos Destacados';
  sectionDescription= 'No te pierdas nuestras actividades culturales y festivales tradicionales.';

  selectedInfo:{title: string, description:string} |null= null;

  cards =[
    {
      title: 'Mani',
      image: '/atardecer.jpg',
      action:()=> this.goToPushEventos(),
      title_button:'Mas Informacion',
      detailTitle: 'Titulo1',
      detailDescription: 'dwkjbcdbcdwbccj',
      mensaje: 'Este es un mensaje adicional sobre Mani.'
    },
    {
      title: 'Sabana larga',
      image: 'https://picsum.photos/300/200?random=2',
      action:()=> this.goToPushEventos(),
      title_button:'boton 2',
      detailTitle: 'Titulo2',
      detailDescription: 'dwkjbcdbcdwbccj',
      mensaje: 'Este es un mensaje adicional sobre Mani.'
    },
    {
      title: 'Tauramena',
      image: 'https://picsum.photos/300/200?random=3',
      action:()=> this.goToPushEventos(),
      title_button:'boton 3',
      detailTitle: 'Titulo3',
      detailDescription: 'dwkjbcdbcdwbccj'
    },
    {
      title: 'Mani',
      image: 'https://picsum.photos/300/200?random=4',
      action:()=> this.goToPushEventos(),
      title_button:'boton 4',
      detailTitle: 'Titulo4',
      detailDescription: 'dwkjbcdbcdwbccj'
    },
    {
      title: 'Yopal',
      image: 'https://picsum.photos/300/200?random=5',
      action:()=> this.goToPushEventos(),
      title_button:'boton 5',
      detailTitle: 'Titulo5',
      detailDescription: 'dwkjbcdbcdwbccj'
    },
    {
      title: 'Aguazul',
      image: 'https://picsum.photos/300/200?random=5',
      action:()=> this.goToPushEventos(),
      title_button:'boton 6',
      detailTitle: 'Titulo6',
      detailDescription: 'dwkjbcdbcdwbccj'
    }
  ]





  goNext(){
    if (this.currentIndex < this.cards.length -1) {
      this.currentIndex++;
    }
  }

  goPrevius(){
    if(this.currentIndex>0){
      this.currentIndex--;
    }
  }

  getTransform(){
    return `translateX(-${this.currentIndex*100}%)`
  }

  mostrarDetalle(card:any){
    this.selectedInfo={
      title: card.detailTitle,
      description: card.detailDescription
    }
  }

  cerrarDetalle(){
    this.selectedInfo=null;
  }

  
  

  //  images = [
  //   {
  //     src: '/atardecer.jpg',
  //     title: 'Atardecer increíble',
  //     description: 'Disfruta de un paisaje inolvidable'
  //   },
  //   {
  //     src: '/Casanare-3.jpg',
  //     title: 'Naturaleza viva',
  //     description: 'Explora la belleza de Casanare'
  //   },
  //   {
  //     src: '/comida.jpg',
  //     title: 'Delicias locales',
  //     description: 'Sabores auténticos de la región'
  //   },
  //   {
  //     src: '/elemento.jpg',
  //     title: 'Aventura',
  //     description: 'Emoción garantizada para todos'
  //   }
  // ];

  // // currentIndex: number = 0;

  // // Función para mover al siguiente elemento
  // next(): void {
  //   this.currentIndex = (this.currentIndex + 1) % this.images.length;
  // }

  // // Función para mover al anterior elemento
  // prev(): void {
  //   this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  // }

  testimonios = [
    {
      nombre: 'Scarllet',
      ciudad: 'New York',
      mensaje: 'Una experiencia maravillosa en los Llanos. ¡Muy recomendado!',
      foto: '/Widow.jpg'
    },
    {
      nombre: 'Juan',
      ciudad: 'Bogotá',
      mensaje: 'Los paseos a caballo y los atardeceres fueron lo mejor.',
      foto: 'Juan.jpg'
    },
    {
      nombre: 'Ana',
      ciudad: 'Cali',
      mensaje: 'Los paisajes, la comida y la gente son increíbles.',
      foto: 'Ana.jpg'
    }
  ];

  

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndexTestimonios = (this.currentIndexTestimonios + 1) % this.testimonios.length;
    }, 6000); // cambia cada 5 segundos
  }

  goToPushEventos() {
    this.router.navigate(['/eventos']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}

