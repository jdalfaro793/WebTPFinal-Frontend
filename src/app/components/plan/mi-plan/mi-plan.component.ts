import { PlanService } from './../../../services/plan/plan.service';
import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './mi-plan.component.html',
  styleUrls: ['./mi-plan.component.css']
})
export class MiPlanComponent implements OnInit {

  plan: Plan;
  _idPlan: string;

  constructor(
    private planService: PlanService, 
    private activatedRoute: ActivatedRoute, 
    private usuarioService:UsuarioService,
    private router: Router,
    private alumnoService: AlumnoService
    ) { }

  ngOnInit(): void {
    this.plan = new Plan();
    this.getAlumnoPlan();
  }

  getAlumnoPlan(): void {
    this.alumnoService.getByIdUsuario(this.usuarioService.idLogged()).subscribe(
      (result) => {
        this._idPlan = result.plan;
        this.getPlanbyID();
      }
    )
  }

  getPlanbyID(): void {
    console.log(this.usuarioService.idLogged());
    this.planService.getPlanByID(this._idPlan).subscribe((result) => {
      Object.assign(this.plan, result);
    })
  }

  viewMisRutinas(): void {
    this.router.navigate(['rutinapersonal'])
  }

}
