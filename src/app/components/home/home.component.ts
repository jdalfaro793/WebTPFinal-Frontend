import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan/plan';
import { PublicacionFacebook } from 'src/app/models/publicacion-facebook/publicacion-facebook';
import { PlanService } from 'src/app/services/plan/plan.service';
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
  public listaPlanes:Array<Plan>;

  constructor(
    private publicacionFacebookService:PublicacionFacebookService,
    private planService:PlanService
    ) {
      
  }
  ngOnInit(): void {
    this.listaPlanes = new Array<Plan>()
    this.instanciarObjetos();
    this.cargarNoticias();
    this.cargarPlanes();
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
  cargarPlanes():void{
    
    this.planService.getAllPlans().subscribe(
      result=>{
        this.listaPlanes = new Array<Plan>();
        result.forEach(e => {
          let plan = new Plan();
          Object.assign(plan,e);
          this.listaPlanes.push(plan);
        });
      },
      error=>{
        console.log(error);
      }
    )
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
