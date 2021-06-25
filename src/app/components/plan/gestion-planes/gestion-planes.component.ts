import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';

@Component({
  selector: 'app-gestion-planes',
  templateUrl: './gestion-planes.component.html',
  styleUrls: ['./gestion-planes.component.css'],
})
export class GestionPlanesComponent implements OnInit {
  
  planes: Array<Plan>;

  nombreFilter: string;
  diasFilter: string;

  constructor(
    private planService: PlanService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.init();
    this.cargarPlanes();
  }

  init(): void {
    this.planes = new Array<Plan>();
    this.nombreFilter = '';
    this.diasFilter = '';
  }

  cargarPlanes(): void {
    this.planService
      .get(this.nombreFilter, this.diasFilter)
      .subscribe((result) => {
        this.planes = new Array<Plan>();
        result.forEach((element) => {
          let p = new Plan();
          Object.assign(p, element);
          this.planes.push(p);
        });
      });
  }

  searchPlanes(): void {
    this.cargarPlanes();
  }

  viewAll(): void {
    this.init();
    this.cargarPlanes();
  }

  addPlan(): void {
    this.router.navigate(['gestion-planes/plan/new'])
  }

  editPlan(id: string): void {
    this.router.navigate(['gestion-planes/plan/'+ id])
  }

}
