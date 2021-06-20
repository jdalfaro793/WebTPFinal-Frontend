import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia/asistencia';
import { AsistenciaService } from 'src/app/services/asistencia/asistencia.service';

@Component({
  selector: 'app-mis-asistencias',
  templateUrl: './mis-asistencias.component.html',
  styleUrls: ['./mis-asistencias.component.css']
})
export class MisAsistenciasComponent implements OnInit {
  listaAsistencias: Array<Asistencia>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id == '0') {
        this.cargarAllAsistencias();
      } else {
        this.cargarAluAsistencia(params.id);
      }
    });
  }
  iniciarLista() {
    this.listaAsistencias = new Array<Asistencia>();
  }

  cargarAllAsistencias() {
    this.asistenciaService.getAsistencias().subscribe(
      (result) => {
        this.iniciarLista();
        result.forEach((element) => {
          let vAsistencia = new Asistencia();
          Object.assign(vAsistencia, element);
          this.listaAsistencias.push(vAsistencia);
        });
        console.log(this.listaAsistencias);
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }

  cargarAluAsistencia(id: string) {
    this.asistenciaService.getAsistenciaByAlumno(id).subscribe(
      (result) => {
        
        this.iniciarLista();
        if ((result.status == "0")) {
          alert('Error en la busqueda');
        } else {
          result.forEach((element) => {
            let vAsistencia = new Asistencia();
            Object.assign(vAsistencia, element);
            this.listaAsistencias.push(vAsistencia);
          });
          console.log(this.listaAsistencias);

        }
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }
}
