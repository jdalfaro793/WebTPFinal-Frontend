import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Ejercicio } from 'src/app/models/ejercicio/ejercicio';
import { Rutina } from 'src/app/models/rutina/rutina';
import { EjercicioService } from 'src/app/services/ejercicio/ejercicio.service';
import { RutinaService } from 'src/app/services/rutina/rutina.service';

@Component({
  selector: 'app-gestionar-rutina',
  templateUrl: './gestionar-rutina.component.html',
  styleUrls: ['./gestionar-rutina.component.css']
})
export class GestionarRutinaComponent implements OnInit {
  seleccionMesRutina: boolean;
  seleccionDia:boolean;
  agregarBtn:boolean=false;
  validarMes:boolean=false;
  rutina: Rutina = new Rutina();
  meses: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  alumno: Alumno = new Alumno();
  listaRutina: Array<Rutina> = new Array<Rutina>();
  listaEjercicios: Array<Ejercicio> = new Array<Ejercicio>();
  listaPeso: Array<number> = new Array<number>();
  listaSerie: Array<number> = new Array<number>();
  listaRepeticion: Array<number> = new Array<number>();
  listaEjerciciosRutina: Array<Ejercicio> = new Array<Ejercicio>();
  ejercicioR: Ejercicio = new Ejercicio();
  pesoR: number;
  serieR: number;
  repeticionR: number;
  nombre: string;
  foto: string;
  descrip: string;
  idAlum: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ejercicioService: EjercicioService,
    private rutinaService: RutinaService,
    private toastr: ToastrService
  ) {
    this.getEjercicios();
  }

  getEjercicios() {
    this.ejercicioService.getEjercicios().subscribe(
      (result) => {
        result.forEach((element) => {
          let vEjercicio = new Ejercicio();
          Object.assign(vEjercicio, element);
          this.listaEjercicios.push(vEjercicio);
        });
        console.log(this.listaEjercicios);
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }

  verFoto(ejercicio: Ejercicio) {
    this.nombre = ejercicio.nombre;
    this.foto = ejercicio.imagen;
    this.descrip = ejercicio.descripcion;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cargarAlumno(params.id);
      this.idAlum = params.id;
    });
  }

  cargarAlumno(id: string) {
    this.rutinaService.getAlumno(id).subscribe(
      (result) => {
        Object.assign(this.alumno, result);
      },
      (error) => {
        console.log(error);
        alert('error en la peticion');
      }
    );
  }

  agregarALista() {
    console.log(this.rutina.dia);

    if (
      this.rutina.mes == undefined ||
      this.rutina.dia == undefined ||
      this.rutina.nombreRutina == undefined ||
      this.ejercicioR == undefined ||
      this.pesoR == undefined ||
      this.serieR == undefined ||
      this.repeticionR == undefined
    ) {
      alert('No debe tener ningun campo vacio');
    } else {
      this.listaEjerciciosRutina.push(this.ejercicioR);
      this.listaPeso.push(this.pesoR);
      this.listaRepeticion.push(this.repeticionR);
      this.listaSerie.push(this.serieR);

      this.seleccionMesRutina = true;
      this.seleccionDia = true;
      this.agregarBtn = true;
      this.ejercicioR = new Ejercicio();
      this.pesoR = null;
      this.serieR = null;
      this.repeticionR = null;
    }
  }

  CrearRutina() {
    this.rutina.ejercicio = this.listaEjerciciosRutina;
    this.rutina.peso = this.listaPeso;
    this.rutina.serie = this.listaSerie;
    this.rutina.repeticion = this.listaRepeticion;
    this.rutina.alumno = this.alumno;
    this.guardar(this.rutina);
  }

  guardar(rutina: Rutina) {
    this.rutinaService.guardarRutina(rutina).subscribe(
      (result) => {
        console.log(result);

          this.toastr.success("Rutina guardada exitosamente","Rutina Guardada");
          this.reiniciarCampos();
          
        
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reiniciarCampos() {
    this.seleccionDia = false;
    this.agregarBtn=false;
    this.listaRutina = new Array<Rutina>();
    this.listaPeso = new Array<number>();
    this.listaSerie = new Array<number>();
    this.listaRepeticion = new Array<number>();
    this.listaEjerciciosRutina = new Array<Ejercicio>();
    this.ejercicioR = new Ejercicio();
    this.pesoR = null;
    this.serieR = null;
    this.repeticionR = null;
    this.nombre = null;
    this.foto = null;
    this.descrip = null;
  }

  volver(){
    this.router.navigate(["gestionAlumno"]);
  }
  cargarRutinaMes() {
    this.rutinaService.getRutinaAlumnoMes(this.idAlum, this.rutina.mes).subscribe(
      (result) => {
        if (result[0] != undefined) {
          this.toastr.error('Ya posee rutina asignada para este mes', 'El alumno debe revisar sus rutinas');

          this.validarMes=false;
        } else { 
          this.toastr.success('Tiene el mes disponible', 'Sin Rutina Asignada');
          this.validarMes=true;
          }
      },
      (error) => {
        console.log(error);
        this.toastr.error('ERROR EN LA PETICION', 'ERROR');
      }
    );
  }
}


