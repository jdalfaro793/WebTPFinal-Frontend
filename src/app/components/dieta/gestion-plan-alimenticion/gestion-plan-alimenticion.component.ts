import { ToastrService } from 'ngx-toastr';
import { Plan } from './../../../models/plan/plan';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesDieta } from 'src/app/models/mesDieta/mes-dieta';
import { MesDietaService } from 'src/app/services/dieta/mes-dieta.service';
import { Dieta } from 'src/app/models/dieta/dieta';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/utils/confirm-dialog/confirm-dialog.component';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-gestion-plan-alimenticion',
  templateUrl: './gestion-plan-alimenticion.component.html',
  styleUrls: ['./gestion-plan-alimenticion.component.css']
})
export class GestionPlanAlimenticionComponent implements OnInit {

  planesAlimenticios : Array<MesDieta>;

  filtersObjetivo: string;
  filtersMes: any;

  planDieta: Dieta;

  constructor(
    private mesDietaService: MesDietaService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
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
  }

  init(): void {
    this.planesAlimenticios = new Array<MesDieta>();
    this.planDieta = new Dieta();
    this.initFiltersPlanAlimenticio();
    this.cargarPlanesAlimenticios();
  }

  initFiltersPlanAlimenticio(): void {
    this.filtersObjetivo = '';
    this.filtersMes = '';
  }

  addPlanAlimenticio(): void {
    this.router.navigate(['form-plan-alimentacion/new'])
  }

  editPlan(plan:MesDieta): void {
    this.router.navigate(['form-plan-alimentacion/', plan._id])
  }

  deletePlan(plan:MesDieta): void {
    this.mesDietaService.deletePlanAlimetacion(plan._id).subscribe(
      (result) => {
        if(result.status == '1'){
          this.toastr.success("El plan alimenticio ha sido eliminado", "OPERACIÓN EXITOSA")
        } else  {
          this.toastr.error("Error inesperado", "ERROR")
        }
        this.cargarPlanesAlimenticios()
      }
    )
  }

  cargarPlanesAlimenticios(): void {
    this.mesDietaService.get(this.filtersObjetivo, this.filtersMes).subscribe((result) => {
      this.planesAlimenticios = new Array<MesDieta>();
      result.forEach((element) => {
        let p = new MesDieta();
        Object.assign(p, element);
        this.planesAlimenticios.push(p);
      });
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

  selectPlanDieta(plan: Dieta) {
    this.planDieta = plan;
  }

  confirmDelete(plan: MesDieta): void {
    //dialog.open - recibe el componente que va a lanzar la ventana emergente, y un objeto que incluye un mensaje y el objeto a guardar
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Seguro que desea eliminar?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.deletePlan(plan);
    });
  }

  confirmEdit(plan: MesDieta): void {
    //dialog.open - recibe el componente que va a lanzar la ventana emergente, y un objeto que incluye un mensaje y el objeto a guardar
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: "¿Modificar plan?",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) 
        this.editPlan(plan);
    });
  }
}
