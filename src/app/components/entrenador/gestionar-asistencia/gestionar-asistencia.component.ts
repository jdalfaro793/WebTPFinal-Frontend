import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Asistencia } from 'src/app/models/asistencia/asistencia';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';

@Component({
  selector: 'app-gestionar-asistencia',
  templateUrl: './gestionar-asistencia.component.html',
  styleUrls: ['./gestionar-asistencia.component.css']
})
export class GestionarAsistenciaComponent implements OnInit {

  listaAsistencias: Array<Asistencia>;
  asistencia: Asistencia;
  fecha: Date;
  cambiarFecha: boolean = true;

  constructor(private router: Router,
              private asistenciaService: AsistenciaService,
              private alumnoService: AlumnoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
          this.cargarAlumno(params.id);
          this.iniciarAsistencia();
          this.cargarAsistencias(params.id);
    });
  }

  iniciarAsistencia(){
    this.asistencia = new Asistencia;
    this.fecha = new Date();
  }

  cargarAsistencias(id: string){
    this.listaAsistencias = new Array<Asistencia>();
    this.asistenciaService.getAsistenciaByAlumno(id).subscribe(
      result=>{
        result.forEach(element => {
          let vAsistencia = new Asistencia();
          Object.assign(vAsistencia, element);
          this.listaAsistencias.push(vAsistencia);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar asistencias");
      }
    )
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      (result) => {
        let vAlumno = new Alumno;
        Object.assign(vAlumno, result);
        this.asistencia.alumno = vAlumno;
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }

  guardarAsistencia(){
    this.asistencia.fecha = this.fecha;
    this.asistenciaService.addAsistencia(this.asistencia).subscribe(
      result=>{
        if(result.status=="1"){
          alert("La asistencia se agrego correctamente");
          this.cargarAsistencias(this.asistencia.alumno._id);
          this.fecha = new Date();
        }
      },
      error=>{
        console.log(error);
      }

    )
  }

  sumarDia(){
    this.cambiarFecha = !(this.cambiarFecha);
    this.fecha.setDate(this.fecha.getDate() + 1);
  }

  restarDia(){
    this.cambiarFecha = !(this.cambiarFecha);
    this.fecha.setDate(this.fecha.getDate() - 1);
  }

  volver(){
    this.router.navigate(["gestionAlumno"]);
  }
}