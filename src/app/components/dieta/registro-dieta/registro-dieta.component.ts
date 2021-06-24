import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno/alumno';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { RegistroDieta } from 'src/app/models/registroDieta/registro-dieta';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';
import { RegistroDietaService } from 'src/app/services/dieta/registro-dieta.service';

@Component({
  selector: 'app-registro-dieta',
  templateUrl: './registro-dieta.component.html',
  styleUrls: ['./registro-dieta.component.css'],
})
export class RegistroDietaComponent implements OnInit {
  alumno: Alumno;

  foto: string;

  registroDieta: RegistroDieta;

  planesAlimenticios: Array<MesDieta>;

  filtersObjetivo: string;
  filtersMes: any;

  planSelect: MesDieta;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mesDietaService: MesDietaService,
    private alumnoService: AlumnoService,
    private toastr: ToastrService,
    private registroDietaService: RegistroDietaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.init();
    this.activatedRoute.params.subscribe((params) => {
      this.cargarAlumno(params.id);
      this.cargarPlanesAlimenticios();
      console.log(this.planesAlimenticios);
    });
  }

  init(): void {
    this.alumno = new Alumno();
    this.registroDieta = new RegistroDieta();
    this.planesAlimenticios = new Array<MesDieta>();
    this.initFiltersPlanAlimenticio();
    console.log(this.registroDieta.plan_dieta);
  }

  initFiltersPlanAlimenticio(): void {
    this.filtersObjetivo = '';
    this.filtersMes = '';
  }

  cargarAlumno(id: string): void {
    this.alumnoService.getAlumno(id).subscribe((result) => {
      this.alumno = result;
      this.registroDieta.alumno = this.alumno;
      console.log(this.alumno);
    });
  }

  onFileChanges(files) {
    //console.log("File has changed:", files);
    this.registroDieta.foto = files[0].base64;
    this.foto = files[0].base64;
    //console.log(this.noticia.img)
    //this.file = files[0]
    console.log('Change After: ', this.registroDieta);
  }

  verFoto() {
    //this.nombre=ejercicio.nombre;
    this.foto = this.registroDieta.foto;
  }

  saveRegistroDieta(): void {
    if (this.validar()) {
      this.registroDieta.fecha = new Date();
      this.registroDietaService
        .addRegistro(this.registroDieta)
        .subscribe((result) => {
          console.log(result);
          if (result.status == 1) {
            this.toastr.success(
              'Se ha guardado el registro',
              'OPERACIÓN EXITOSA'
            );
            this.router.navigate(['gestionAlumno']);
          } else {
            this.toastr.success('Ha ocurrido un error', 'ERROR');
          }
        });
    }
  }

  validar(): boolean {
    if (this.registroDieta.plan_dieta != undefined) {
      if (this.registroDieta.foto != undefined) {
        return true;
      } else {
        this.toastr.warning('Debe ingresar una imagen', 'ATENCIÓN');
      }
    } else {
      this.toastr.warning(
        'Debe seleccionar un plan de alimentación',
        'ATENCIÓN'
      );
      return false;
    }
  }

  cancelar(): void {
    this.router.navigate(['gestionAlumno'])
  }

  /*
        PLANES ALIMENTICIOS
  */
  cargarPlanesAlimenticios(): void {
    this.mesDietaService
      .get(this.filtersObjetivo, this.filtersMes)
      .subscribe((result) => {
        this.planesAlimenticios = new Array<MesDieta>();
        result.forEach((element) => {
          let p = new MesDieta();
          Object.assign(p, element);
          console.log(p);
          this.planesAlimenticios.push(p);
        });
        console.log(this.planesAlimenticios);
      });
  }

  searchPlanAlimentacion(): void {
    this.cargarPlanesAlimenticios();
  }

  cleanFiltersPlanALimenticio(): void {
    this.initFiltersPlanAlimenticio();
    this.cargarPlanesAlimenticios();
  }

  onMesChange(event): void {
    this.filtersMes = event;
    this.cargarPlanesAlimenticios();
  }

  selectPlanAlimenticio(plan: MesDieta): void {
    this.registroDieta.plan_dieta = plan;
    this.registroDieta.objetivo = plan.objetivo;
    this.planSelect = plan;
    this.toastr.info('', 'Plan Seleccionado');
  }
}
