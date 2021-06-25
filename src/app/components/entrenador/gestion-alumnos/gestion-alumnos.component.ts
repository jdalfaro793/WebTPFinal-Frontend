import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ConfirmDialogComponent } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.css'],
})
export class GestionAlumnosComponent implements OnInit {
  alumnos: Array<Alumno>;
  findByApellido: string;
  findByDni: string;
  alumnoBuscado: string;
  fechaNueva: Date;
  fechaVencida: boolean = false;

  constructor(
    private alumnoService: AlumnoService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    if (this.usuarioService.userLoggedIn() == false) {
      alert("Debe validarse e ingresar su usuario y clave");
      this.router.navigate(['login']);
    } else if (this.usuarioService.isLoggedAlumno() == true) {
      alert("No tiene permisos para esta seccion");
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.findByApellido = '';
    this.findByDni = '';
    this.alumnoBuscado = '';
    this.cargarAlumnos();
  }

  verificarApellidoOrDni() {
    const valoresAceptados = /^[0-9]*$/;
    if (this.alumnoBuscado.match(valoresAceptados)) {
      this.findByDni = this.alumnoBuscado;
    } else {
      this.findByApellido = this.alumnoBuscado;
    }
  }

  cargarAlumnos(): void {
    this.verificarApellidoOrDni();
    this.alumnos = new Array<Alumno>();
    this.alumnoService.get(this.findByApellido, this.findByDni).subscribe(
      (result) => {
        result.forEach((element) => {
          let alumno = new Alumno();
          Object.assign(alumno, element);
          this.alumnos.push(alumno);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verificarFecha(alumno: Alumno): boolean {
    this.fechaNueva = new Date();
    this.fechaNueva.setMonth(this.fechaNueva.getMonth() - alumno.mes);
    var fechaInicio = Date.parse(alumno.fecha_inicio.toString());
    if (this.fechaNueva.valueOf() < fechaInicio.valueOf()) {
      return true;
    } else {
      return false;
    }
  }

  verificarRutina(alumno: Alumno): boolean {
    if (alumno.mes == alumno.ultimaRutinaMes) {
      return true;
    } else {
      return false;
    }
  }

  verificarPlan(alumno: Alumno): boolean {
    if (alumno.mes == alumno.ultimoPlanMes) {
      return true;
    } else {
      return false;
    }
  }

  mostrarActualizado() {
    this.toastr.info('El plan alimenticio del alumno se encuentra actualizado');
  }

  mostrarCuotaImpaga() {
    this.toastr.info('No se puede actualizar, cuota impaga');
  }

  limpiarFiltro() {
    this.findByApellido = '';
    this.findByDni = '';
    this.alumnoBuscado = '';
    this.cargarAlumnos();
  }

  agregarCuota(alumno: Alumno) {
    this.router.navigate(['cuota/', alumno._id]);
  }

  agregarAsistencia(alumno: Alumno) {
    this.router.navigate(['asistencia/', alumno._id]);
  }

  agregarRutina(alumno: Alumno) {
    this.router.navigate(['rutina/', alumno._id, alumno.mes]);
  }

  activarAlumno(alumno: Alumno) {
    alumno.usuario.state = !alumno.usuario.state;
    this.usuarioService.updateUsuario(alumno.usuario).subscribe(
      (result) => {
        if (result.status == '1') {
          this.toastr.success(
            'El usuario fue modificado correctamente',
            'OPERACION EXITOSA'
          );
        } else {
          this.toastr.error(
            'Error al modificar el usuario',
            'OPERACION FALLIDA'
          );
        }
      },
      (error) => {
        console.log(error);
        alert('Error al modificar el usuario');
      }
    );
  }

  confirmChangeState(alumno: Alumno): void {
    //dialog.open - recibe el componente que va a lanzar la ventana emergente, y un objeto que incluye un mensaje y el objeto a guardar
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '¿Cambiar el estado del alumno?',
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.activarAlumno(alumno);
    });
  }

  registrarPlanAlimentacionAlumno(id: string): void {
    this.router.navigate(['registrar-dieta/', id]);
  }

  registrarAlumno() {
    this.router.navigate(['form-alumno/', 0]);
  }

  modificarAlumno(alumno: Alumno) {
    this.router.navigate(['form-alumno/', alumno._id]);
  }

  verRegistrosPlanAlimentacion(id: string): void {
    this.router.navigate(['verRegistrosDieta/', id]);
  }
}
