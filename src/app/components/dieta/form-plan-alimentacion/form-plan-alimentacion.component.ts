import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dieta } from 'src/app/models/dieta/dieta';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';

@Component({
  selector: 'app-form-plan-alimentacion',
  templateUrl: './form-plan-alimentacion.component.html',
  styleUrls: ['./form-plan-alimentacion.component.css']
})
export class FormPlanAlimentacionComponent implements OnInit {

  dieta: Dieta;

  dietas: Array<Dieta>;

  planAlimentacion: MesDieta;

  listaDias: Array<string>;

  saveInvalid: boolean;

  action: string;

  constructor(
    private mesDietaService: MesDietaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.init();
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params.id != 'new') {
          this.action = 'update';
          this.cargarPlanAlimentacionEdit(params.id);
        } else {
          this.action = 'new';
        }
      }
    )
  }

  cargarPlanAlimentacionEdit(id: string): void {
    this.mesDietaService.getPlanAlimentacionById(id).subscribe(
      (result) => {
        this.dietas = result.planSemanal;
        this.planAlimentacion = result;
      }
    )
  }

  init(): void {
    this.dieta = new Dieta();
    this.dietas = new Array<Dieta>();
    this.planAlimentacion = new MesDieta();
    this.planAlimentacion.planSemanal = new Array<Dieta>();
    //this.saveInvalid = true;
    this.initListaDias();
  }

  initListaDias(): void {
    this.listaDias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  }

  addDieta(): void {
    this.dietas.push(this.dieta);
    this.dieta = new Dieta();
    if(this.dietas.length > 6) {
      this.saveInvalid = false;
    }
  }

  savePlanAlimeticion(): void {
    if(this.dietasCargadas()){
      this.planAlimentacion.planSemanal = this.dietas;
      if(this.action === 'new') {
        this.newPlanAlimentacion();
      } else {
        this.updatePlanAlimentacion();
      }
      this.router.navigate(['plan-alimentacion']);
    }
    
  }

  dietasCargadas(): boolean {
    if(this.dietas.length < 6){
      this.toastr.warning("Debe cargar al menos 6 dietas", "ATENCIÓN")
      return false;
    } else
      return true;
  }

  newPlanAlimentacion(): void {
    this.mesDietaService.addPlanAlimenticion(this.planAlimentacion).subscribe(
      (result) => {
        if(result.status == 1){
          this.toastr.success("Plan de alimentación guardado", "OPERACIÓN EXITOSA")
        } else {
          this.toastr.error("Ha ocurrido un error inesperado", "ERROR")
        }
      }
    )
  }

  updatePlanAlimentacion(): void {
    this.mesDietaService.editPlanAlimenticio(this.planAlimentacion).subscribe(
      (result) => {
        if(result.status == 1){
          this.toastr.success("Plan de alimentación guardado", "OPERACIÓN EXITOSA")
        } else {
          this.toastr.error("Ha ocurrido un error inesperado", "ERROR")
        }
      }
    )
  }

  cancel(): void {
    this.router.navigate(['plan-alimentacion'])
  }

  deleteDieta(dieta: Dieta): void {
    let d = new Array<Dieta>();
    this.dietas.forEach((element) => {
      if(element != dieta){
        d.push(element);
      }
    })
    this.dietas = d;
  }

  editDieta(dieta: Dieta): void {
    this.dieta = dieta;
    this.deleteDieta(dieta);
  }

}
