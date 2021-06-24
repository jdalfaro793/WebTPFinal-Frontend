import { PlanService } from './../../../services/plan/plan.service';
import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan/plan';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './mi-plan.component.html',
  styleUrls: ['./mi-plan.component.css']
})
export class MiPlanComponent implements OnInit {

  plan: Plan;

  constructor(
    private planService: PlanService, 
    private activatedRoute: ActivatedRoute, 
    private usuarioService:UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.plan = new Plan();
    this.getPlanbyID();
   
  }

  getPlanbyID(): void {
    this.planService.getPlanByID(this.usuarioService.alumnoLogeado._id).subscribe((result) => {
      
      Object.assign(this.plan, result);
    })
  }

  viewMisRutinas(): void {
    this.router.navigate(['rutinapersonal'])
  }

}
