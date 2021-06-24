import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Cuota } from 'src/app/models/cuota/cuota';
import { CuotaService } from 'src/app/services/cuota/cuota.service';
import * as printJS from 'print-js';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { Plan } from 'src/app/models/plan/plan';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-mis-cuotas',
  templateUrl: './mis-cuotas.component.html',
  styleUrls: ['./mis-cuotas.component.css']
})
export class MisCuotasComponent implements OnInit {

  cuotas: Array<Cuota>;
  filters: Cuota;
  cuotaComprobante: Cuota;

  constructor(private cuotaService: CuotaService, 
              private activatedRoute: ActivatedRoute,
              private alumnoService: AlumnoService,
              private usuarioService:UsuarioService
              ) { }

  ngOnInit(): void {
    this.initFilters();
    this.cuotas = new Array<Cuota>();
    this.iniciarCuota();
    this.cargarMisCuotas();
  }

  iniciarCuota(){
    this.cuotaComprobante = new Cuota();
    this.cuotaComprobante.alumno = new Alumno();
    this.cuotaComprobante.alumno.plan = new Plan();
  }

  cargarCuotas(): void {
    this.cuotaService.get(this.filters).subscribe(
      (result) => {
        this.cuotas = new Array<Cuota>();
        result.forEach((element) => {
          let cuota = new Cuota();
          Object.assign(cuota, element)
          this.cuotas.push(cuota);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
 //metodo en desuso
  cargarMisCuotas(): void {
    this.cuotaService.getByAlumno(this.usuarioService.alumnoLogeado._id).subscribe(
      (result) => {
        console.log(result)
        this.cuotas = new Array<Cuota>();
        result.forEach((element) => {
          let cuota = new Cuota();
          Object.assign(cuota, element)
          this.cuotas.push(cuota);
        });
      },
      (error) => {
        console.log(error);
      }
    );
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
      documentTitle: 'Sistema Gym G-X',
      type: 'html'
    })
  }

  initFilters(): void {
    this.filters = new Cuota();
    this.filters.alumno = new Alumno();
    this.filters.monto = 0;
    this.filters.modo_pago = '';
    this.filters.alumno.apellido = '';
    this.filters.alumno.nombre = '';
  }
}
