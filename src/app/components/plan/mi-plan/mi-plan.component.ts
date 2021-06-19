import { PlanService } from './../../../services/plan/plan.service';
import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/plan/plan';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mi-plan',
  templateUrl: './mi-plan.component.html',
  styleUrls: ['./mi-plan.component.css']
})
export class MiPlanComponent implements OnInit {

  plan: Plan;

  constructor(private planService: PlanService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id == '0') {
        
      } else {
        this.getPlanbyID(params.id);
      }
    });
  }

  getPlanbyID(id: string): void {
    this.planService.getPlanByID(id).subscribe((result) => {
      this.plan = new Plan();
      Object.assign(this.plan, result);
    })
  }

  viewMisRutinas(): void {
    this.router.navigate(['rutinapersonal/0'])
  }

}
