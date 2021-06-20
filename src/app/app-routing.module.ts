import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GestionCuotaComponent } from './components/cuota/gestion-cuota/gestion-cuota.component';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno/form-alumno.component';
import { GestionAlumnosComponent } from './components/entrenador/gestion-alumnos/gestion-alumnos.component';
import { CuotaComponent } from './components/cuota/cuota/cuota.component';
import { MisCuotasComponent } from './components/cuota/mis-cuotas/mis-cuotas.component';
import { MiPlanComponent } from './components/plan/mi-plan/mi-plan.component';
import { MisRutinasComponent } from './components/rutina/mis-rutinas/mis-rutinas.component';
import { MisAsistenciasComponent } from './components/asistencia/mis-asistencias/mis-asistencias.component';
import { GestionRutinaComponent } from './components/rutina/gestion-rutina/gestion-rutina.component';

const routes: Routes = [
  { path: 'login',component: LoginComponent },
  { path: 'gestion-cuota', component: GestionCuotaComponent},
  { path: 'gestion-rutina/:id', component: GestionRutinaComponent},

  { path: 'gestionAlumno/form-alumno', component: FormAlumnoComponent},
  { path: 'gestionAlumno',component: GestionAlumnosComponent },
  { path: 'cuota', component: CuotaComponent},

  { path: 'mis-asistencias/:id',component: MisAsistenciasComponent },
  { path: 'mis-cuotas/:id', component: MisCuotasComponent},
  { path: 'mis-rutinas/:id', component: MisRutinasComponent},
  { path: 'mi-plan/:id', component: MiPlanComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
