import { Component, OnInit } from '@angular/core';
import { PublicacionFacebook } from 'src/app/models/publicacion-facebook/publicacion-facebook';
import { PublicacionFacebookService } from 'src/app/services/publicacion-facebook/publicacion-facebook.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  publicacion:PublicacionFacebook;
  listaPublicaciones:Array<PublicacionFacebook>;
  indice: number = 0;

  constructor(private publicacionFacebookService:PublicacionFacebookService) {
    this.instanciarObjetos();

    this.cargarNoticias();
  }
  ngOnInit(): void {
  }
  instanciarObjetos(){
    this.publicacion=new PublicacionFacebook();
    this.listaPublicaciones = new Array<PublicacionFacebook>();
  }

  iniciar() {
    if (this.indice < this.listaPublicaciones.length) {
      this.publicacion = this.listaPublicaciones[this.indice];
    }
  }

  previo() {
    this.indice = this.indice - 1;

    if (this.indice < this.listaPublicaciones.length) {
      this.publicacion = this.listaPublicaciones[this.indice];
    }
  }

  siguiente() {
    this.indice = this.indice + 1;

    if (this.indice < this.listaPublicaciones.length) {
      this.publicacion = this.listaPublicaciones[this.indice];
    }
  }


  
cargarNoticias(){
  this.publicacionFacebookService.getPublicaciones().subscribe(
    result=>{
      result.forEach(element => {
        let vPublicacion=new PublicacionFacebook();
        Object.assign(vPublicacion,element);
        if(vPublicacion.vigente==true){
          this.listaPublicaciones.push(vPublicacion);
        }
        this.iniciar();
      });
    },
    error=>{
      console.log(error)
      alert("error en la peticion");
    
    }
  )

}

}
