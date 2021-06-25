import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-alta-edit-plan',
  templateUrl: './alta-edit-plan.component.html',
  styleUrls: ['./alta-edit-plan.component.css']
})
export class AltaEditPlanComponent implements OnInit {

  plan: Plan;

  action: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private planService: PlanService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.init();
    this.paramsInit();
  }

  paramsInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params.id != 'new') {
          this.action = 'update';
          this.cargarPlanEdit(params.id);
        } else {
          this.action = 'new';
        }
      }
    )
  }

  init(): void {
    this.plan = new Plan();
  }

  cancel(): void {
    this.router.navigate(['gestion-planes'])
  }

  cargarPlanEdit(id: string): void {
    this.planService.getPlanByID(id).subscribe(
      (result) => {
        Object.assign(this.plan, result);
      }
    )
  }

  savePlan(): void {
    if(this.action === 'new') {
      this.newPlan();
    } else {
      this.updatePlan();
    }
    
  }

  newPlan(): void {
    this.planService.add(this.plan).subscribe(
      (result) => {
        if(result.status == 1) {
          this.toastr.success("Plan guardado con éxito", "OPERACIÓN EXITOSA");
          this.router.navigate(['gestion-planes']);
        } else {
          this.toastr.error("Ha ocurrido un error inesperado", "ERROR");
        }  
      }
    )
  }

  updatePlan(): void {
    this.planService.put(this.plan).subscribe(
      (result) => {
        if(result.status == 1) {
          this.toastr.success("Se ha actualizado el plan", "OPERACIÓN EXITOSA");
          this.router.navigate(['gestion-planes']);
        } else {
          this.toastr.error("Ha ocurrido un error inesperado", "ERROR");
        }  
      }
    )
  }

}
