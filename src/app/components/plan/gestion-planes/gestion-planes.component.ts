import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan/plan';
import { PlanService } from 'src/app/services/plan/plan.service';
import { ConfirmDialogComponent } from 'src/app/utils/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private dialog: MatDialog
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

  confirmEdit(id: string): void {
    //dialog.open - recibe el componente que va a lanzar la ventana emergente, y un objeto que incluye un mensaje y el objeto a guardar
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Modificar plan?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.editPlan(id);
    });
  }

}
