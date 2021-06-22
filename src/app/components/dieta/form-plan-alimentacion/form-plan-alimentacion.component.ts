import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dieta } from 'src/app/models/dieta/dieta';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';

@Component({
  selector: 'app-form-plan-alimentacion',
  templateUrl: './form-plan-alimentacion.component.html',
  styleUrls: ['./form-plan-alimentacion.component.css']
})
export class FormPlanAlimentacionComponent implements OnInit {

  dieta: Dieta;

  dietas: Array<Dieta>;

  planAlimentacion: MesDieta;

  constructor(
    private mesDietaService: MesDietaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.dieta = new Dieta();
    this.dietas = new Array<Dieta>();
    this.planAlimentacion = new MesDieta();
    this.planAlimentacion.planSemanal = new Array<Dieta>();
  }

  addDieta(): void {
    this.dietas.push(this.dieta);
    this.dieta = new Dieta();
  }

  savePlanAlimeticion(): void {
    this.planAlimentacion.planSemanal = this.dietas;
    this.mesDietaService.addPlanAlimenticion(this.planAlimentacion).subscribe(
      (result) => {
        console.log(result);
        this.init();
        this.router.navigate(['plan-alimentacion'])
      }
    )
  }

}
