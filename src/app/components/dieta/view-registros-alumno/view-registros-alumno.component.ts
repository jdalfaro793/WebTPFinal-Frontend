import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Dieta } from 'src/app/models/dieta/dieta';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { RegistroDieta } from 'src/app/models/registroDieta/registro-dieta';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';
import { RegistroDietaService } from 'src/app/services/dieta/registro-dieta.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-view-registros-alumno',
  templateUrl: './view-registros-alumno.component.html',
  styleUrls: ['./view-registros-alumno.component.css']
})
export class ViewRegistrosAlumnoComponent implements OnInit {

  registros: Array<RegistroDieta>;

  _idALumno: string;

  alumno: Alumno;

  planDieta: Dieta;
  planSemanalRegistro: Array<Dieta>;
  mesRegistro: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private registroDietaService : RegistroDietaService,
    private mesDietaService : MesDietaService,
    private alumnoService: AlumnoService,
    private router: Router,
    private usuarioService: UsuarioService
    ) { 
      if(this.usuarioService.userLoggedIn() == false){
        alert("Debe validarse e ingresar su usuario y clave");
        this.router.navigate(['login']);
    }else if(this.usuarioService.isLoggedAlumno() == true){
      alert("No tiene permisos para esta seccion");
        this.router.navigate(['home']);
    }
    }

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
            reg.plan_dieta = this.getPlanALimentacion(reg.plan_dieta._id)
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

  mostrarDieta(registro: RegistroDieta){
    this.planSemanalRegistro = new Array<Dieta>();
    this.planSemanalRegistro = registro.plan_dieta.planSemanal;
    this.mesRegistro = registro.plan_dieta.mes;
  }

  selectPlanDieta(plan: Dieta) {
    this.planDieta = plan;
  }

  volver(): void {
    this.router.navigate(['gestionAlumno']);
  }

}
