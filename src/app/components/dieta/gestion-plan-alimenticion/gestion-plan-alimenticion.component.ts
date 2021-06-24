import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';

@Component({
  selector: 'app-gestion-plan-alimenticion',
  templateUrl: './gestion-plan-alimenticion.component.html',
  styleUrls: ['./gestion-plan-alimenticion.component.css']
})
export class GestionPlanAlimenticionComponent implements OnInit {

  planesAlimenticios : Array<MesDieta>;

  filtersObjetivo: string;
  filtersMes: any;

  constructor(
    private mesDietaService: MesDietaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    console.log("iniciar")
    this.planesAlimenticios = new Array<MesDieta>();
    this.initFiltersPlanAlimenticio();
    this.cargarPlanesAlimenticios();
  }

  initFiltersPlanAlimenticio(): void {
    this.filtersObjetivo = '';
    this.filtersMes = '';
  }

  addPlanAlimenticio(): void {
    this.router.navigate(['form-plan-alimentacion/new'])
  }

  editPlan(plan:MesDieta): void {
    this.router.navigate(['form-plan-alimentacion/', plan._id])
  }

  deletePlan(plan:MesDieta): void {
    this.mesDietaService.deletePlanAlimetacion(plan._id).subscribe(
      (result) => {
        console.log(result)
        this.cargarPlanesAlimenticios()
      }
    )
  }

  cargarPlanesAlimenticios(): void {
    this.mesDietaService.get(this.filtersObjetivo, this.filtersMes).subscribe((result) => {
      console.log(result)
      this.planesAlimenticios = new Array<MesDieta>();
      result.forEach((element) => {
        let p = new MesDieta();
        Object.assign(p, element);
        console.log(p)
        this.planesAlimenticios.push(p);
      });
      console.log(this.planesAlimenticios)
    });
  }

  searchPlanAlimentacion(): void {
    this.cargarPlanesAlimenticios();
  }

  cleanFiltersPlanALimenticio(): void {
    this.initFiltersPlanAlimenticio();
    this.cargarPlanesAlimenticios();
  }

  onMesChange(event): void {
    this.filtersMes = event;
    this.cargarPlanesAlimenticios();
  }

}
