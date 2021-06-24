import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { RegistroDieta } from 'src/app/models/registroDieta/registro-dieta';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';
import { RegistroDietaService } from 'src/app/services/dieta/registro-dieta.service';

@Component({
  selector: 'app-view-registros-alumno',
  templateUrl: './view-registros-alumno.component.html',
  styleUrls: ['./view-registros-alumno.component.css']
})
export class ViewRegistrosAlumnoComponent implements OnInit {

  registros: Array<RegistroDieta>;

  _idALumno: string;

  alumno: Alumno;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registroDietaService : RegistroDietaService,
    private mesDietaService : MesDietaService,
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.init();
    this.cargarRegistrosAlumno();
    this.cargarAlumno(this._idALumno);
  }

  init(): void {
    this.registros = new Array<RegistroDieta>();
    this.alumno = new Alumno();
    this.assingID();
  }

  assingID(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this._idALumno = params.id;
      }
    )
  }

  cargarRegistrosAlumno(): void {
    this.registroDietaService.getRegistrosByIDAlumno(this._idALumno).subscribe(
      (result) => {
        result.forEach(
          (element) => {
            let reg = new RegistroDieta();
            Object.assign(reg, element);
            reg.plan_dieta = this.getPlanALimentacion(element.plan_dieta)
            this.registros.push(reg);
          }
        )
      }
    )
  }

  cargarAlumno(id: string): void {
    this.alumnoService.getAlumno(id).subscribe((result) => {
      this.alumno = result;
    });
  }

  getPlanALimentacion(id: string): MesDieta {
    var plan = new MesDieta();
    this.mesDietaService.getPlanAlimentacionById(id).subscribe(
      (result) => {
          Object.assign(plan, result)
      }
    )
    return plan;
  }


}
