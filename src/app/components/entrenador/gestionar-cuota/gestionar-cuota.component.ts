import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Cuota } from 'src/app/models/cuota/cuota';
import { Plan } from 'src/app/models/plan/plan';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import * as printJS from 'print-js';

@Component({
  selector: 'app-gestionar-cuota',
  templateUrl: './gestionar-cuota.component.html',
  styleUrls: ['./gestionar-cuota.component.css']
})
export class GestionarCuotaComponent implements OnInit {

  listaCuotas: Array<Cuota>;
  cuota: Cuota;
  fecha: Date;
  cuotaComprobante: Cuota;

  constructor(private router: Router,
              private cuotaService: CuotaService,
              private alumnoService: AlumnoService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
          this.iniciarCuota();
          this.cargarAlumno(params.id);
          this.cargarCuotas(params.id);
    });
  }

  iniciarCuota(){
    this.cuota = new Cuota();
    this.cuota.alumno = new Alumno();
    this.cuota.alumno.plan = new Plan();
    this.cuotaComprobante = new Cuota();
    this.cuotaComprobante.alumno = new Alumno();
    this.cuotaComprobante.alumno.plan = new Plan();
    this.fecha = new Date();
  }

  cargarCuotas(id: string){
    this.listaCuotas = new Array<Cuota>();
    this.cuotaService.getByAlumno(id).subscribe(
      result=>{
        result.forEach(element => {
          let vCuota = new Cuota();
          Object.assign(vCuota, element);
          this.listaCuotas.push(vCuota);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar cuotas");
      }
    )
  }

  cargarAlumno(id: string) {
    this.alumnoService.getAlumno(id).subscribe(
      (result) => {
        let vAlumno = new Alumno;
        Object.assign(vAlumno, result);
        this.cuota.alumno = vAlumno;
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }

  guardarCuota(formCuota: NgForm){
    this.cuota.fecha_pago = this.fecha;
    this.cuota.monto = this.cuota.alumno.plan.precio;
    this.cuotaService.addCuota(this.cuota).subscribe(
      result=>{
        if(result.status=="1"){
          this.toastr.success("La cuota fue guardada correctamente", "OPERACION EXITOSA");
          this.cargarCuotas(this.cuota.alumno._id);
          formCuota.reset();
          this.cuota.alumno.mes = this.cuota.alumno.mes+1;
          this.alumnoService.updateAlumno(this.cuota.alumno).subscribe();
        }else{
          this.toastr.error("Error al guardar la cuota", "OPERACION FALLIDA");
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  verComprobante(cuota: Cuota){
    this.cuotaComprobante = cuota;
    this.alumnoService.getAlumno(this.cuotaComprobante.alumno._id).subscribe(
      (result) => {
        let vAlumno = new Alumno;
        Object.assign(vAlumno, result);
        this.cuotaComprobante.alumno = vAlumno;
      }
    );
  }

  imprimir(){
    printJS({
      printable: 'ComprobantePago',
      targetStyles: ['*'],
      header: '<h2>Comprobante de pago</h2>',
      documentTitle: 'Sistema GymGrupo10',
      type: 'html'
    })
  }

  volver(){
    this.router.navigate(["gestionAlumno"]);
  }
}
