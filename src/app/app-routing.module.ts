import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { LoginComponent } from './components/login/login.component';
import { GestionCuotaComponent } from './components/cuota/gestion-cuota/gestion-cuota.component';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno/form-alumno.component';
import { GestionAlumnosComponent } from './components/entrenador/gestion-alumnos/gestion-alumnos.component';
import { CuotaComponent } from './components/cuota/cuota/cuota.component';
import { MisCuotasComponent } from './components/cuota/mis-cuotas/mis-cuotas.component';
import { MiPlanComponent } from './components/plan/mi-plan/mi-plan.component';

const routes: Routes = [
  { path: 'asistencia/:id',component: AsistenciaComponent },
  { path: 'rutinapersonal/:id',component: RutinaComponent },
  { path: 'login',component: LoginComponent },
  { path: 'gestion-cuota', component: GestionCuotaComponent},
  { path: 'gestionAlumno/form-alumno', component: FormAlumnoComponent},
  { path: 'gestionAlumno',component: GestionAlumnosComponent },
  { path: 'cuota', component: CuotaComponent},
  { path: 'mis-cuotas/:id', component: MisCuotasComponent},
  { path: 'mi-plan/:id', component: MiPlanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
