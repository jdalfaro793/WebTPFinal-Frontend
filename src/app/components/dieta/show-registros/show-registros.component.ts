import { Dieta } from './../../../models/dieta/dieta';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { RegistroDieta } from 'src/app/models/registroDieta/registro-dieta';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';
import { RegistroDietaService } from 'src/app/services/dieta/registro-dieta.service';

@Component({
  selector: 'app-show-registros',
  templateUrl: './show-registros.component.html',
  styleUrls: ['./show-registros.component.css']
})
export class ShowRegistrosComponent implements OnInit {

  registros: Array<RegistroDieta>;

  registroVigente: RegistroDieta;

  _idUser: string;

  _idALumno: string;

  planDieta: Dieta;

  //alumno: Alumno;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registroDietaService : RegistroDietaService,
    private mesDietaService : MesDietaService,
    private alumnoService: AlumnoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.registros = new Array<RegistroDieta>();
    this.registroVigente = new RegistroDieta();
    this.registroVigente.plan_dieta = new MesDieta();
    this.planDieta = new Dieta();
    this.assingID();
    this.getAlumno();
  }

  assingID(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this._idUser = params.id;
      }
    )
  }

  getAlumno(): void {
    this.alumnoService.getByIdUsuario(this._idUser).subscribe(
      (result) => {
        this._idALumno = result._id;
        this.cargarRegistrosAlumno();
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
            this.registros.push(reg);
          }
        );
        this.getUltimoRegistro(this.registros);
      }
    )
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

  getUltimoRegistro(registros: Array<RegistroDieta>) {
    if(registros.length == 0)
      return null;
    else {
      var reg = registros[0];
      registros.forEach(
        (element) => {
          if(element.fecha.valueOf() > reg.fecha.valueOf()){
            reg = element;
          }
        }
      );
      this.registroVigente = reg;
    }
  }

  selectPlanDieta(plan: Dieta) {
    this.planDieta = plan;
  }



}
