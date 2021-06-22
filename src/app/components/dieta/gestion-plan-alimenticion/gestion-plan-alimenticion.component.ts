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
    this.cargarPlanesAlimenticios();
  }

  cargarPlanesAlimenticios(): void {
    this.mesDietaService.getAll().subscribe(
      (result) => {
        this.planesAlimenticios = new Array<MesDieta>();
        result.forEach(element => {
          let p = new MesDieta();
          Object.assign(p, element);
          this.planesAlimenticios.push(p);
        })
      }
    )
  }

  addPlanAlimenticio(): void {
    this.router.navigate(['form-plan-alimentacion'])
  }

}
