import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.css']
})
export class GestionAlumnosComponent implements OnInit {

  alumnos: Array<Alumno>;

  constructor(private alumnoService: AlumnoService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos() {
    this.alumnos = new Array<Alumno>();
    this.alumnoService.getAlumnos().subscribe(
      result=>{
        result.forEach(element => {
          let vAlumno= new Alumno();
          Object.assign(vAlumno, element);
          this.alumnos.push(vAlumno);
        });
      },
      error=>{
        console.log(error);
        alert("Error al cargar alumnos");
      }
    )
  }

agregarCuota(alumno: Alumno){
  this.router.navigate(["cuota/", alumno._id ]);
}

agregarAsistencia(alumno: Alumno){
  this.router.navigate(["asistencia/", alumno._id ]);
}

}

