import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css']
})
export class FormAlumnoComponent implements OnInit {

  planes:Array<Plan>;
  plan:Plan;
  alumno:Alumno;
  constructor(
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.alumno = new Alumno();
    this.cargarPlanes();
  }

  cargarPlanes():void{
    this.planes = new Array<Plan>();
    this.planService.getPlans().subscribe(
      result =>{
        result.forEach(element => {
          let p = new Plan();
          Object.assign(p,element);
          this.planes.push(p);
        });
      },
      error=>{
        console.log(error);
        console.log("Error al intentar cargar lista de planes disponibles");
      }
    )
  }
}
