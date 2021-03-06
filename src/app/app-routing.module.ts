import { AltaEditPlanComponent } from './components/plan/alta-edit-plan/alta-edit-plan.component';
import { ShowRegistrosComponent } from './components/dieta/show-registros/show-registros.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno/form-alumno.component';
import { GestionAlumnosComponent } from './components/entrenador/gestion-alumnos/gestion-alumnos.component';
import { MisCuotasComponent } from './components/cuota/mis-cuotas/mis-cuotas.component';
import { MiPlanComponent } from './components/plan/mi-plan/mi-plan.component';
import { MisRutinasComponent } from './components/rutina/mis-rutinas/mis-rutinas.component';
import { MisAsistenciasComponent } from './components/asistencia/mis-asistencias/mis-asistencias.component';
import { GestionarAsistenciaComponent } from './components/entrenador/gestionar-asistencia/gestionar-asistencia.component';
import { GestionarCuotaComponent } from './components/entrenador/gestionar-cuota/gestionar-cuota.component';
import { HomeComponent } from './components/home/home.component';
import { GestionPlanAlimenticionComponent } from './components/dieta/gestion-plan-alimenticion/gestion-plan-alimenticion.component';
import { FormPlanAlimentacionComponent } from './components/dieta/form-plan-alimentacion/form-plan-alimentacion.component';
import { GestionEjercicioComponent } from './components/entrenador/gestion-ejercicio/gestion-ejercicio.component';
import { GestionarRutinaComponent } from './components/entrenador/gestionar-rutina/gestionar-rutina.component';
import { PublicacionFacebookComponent } from './components/publicacion-facebook/publicacion-facebook.component';
import { RegistroDietaComponent } from './components/dieta/registro-dieta/registro-dieta.component';
import { ViewRegistrosAlumnoComponent } from './components/dieta/view-registros-alumno/view-registros-alumno.component';
import { GestionPlanesComponent } from './components/plan/gestion-planes/gestion-planes.component';
import { EstadisticasComponent } from './components/entrenador/estadisticas/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login',component: LoginComponent },


  
  { path: 'mis-asistencias/:id',component: MisAsistenciasComponent },
  { path: 'mis-cuotas/:id', component: MisCuotasComponent},
  { path: 'mis-rutinas/:id', component: MisRutinasComponent},
  { path: 'mi-plan/:id', component: MiPlanComponent},
  { path: 'misDietas/:id', component: ShowRegistrosComponent },
  
  { path: 'gestionAlumno',component: GestionAlumnosComponent },
  { path: 'gestionAlumno/form-alumno', component: FormAlumnoComponent},
  { path: 'verRegistrosDieta/:id' , component: ViewRegistrosAlumnoComponent},
  { path: 'cuota/:id', component: GestionarCuotaComponent},
  { path: 'rutina/:id/:mes', component: GestionarRutinaComponent},
  { path: 'asistencia/:id', component: GestionarAsistenciaComponent},
  { path: 'form-alumno/:id', component: FormAlumnoComponent},

  { path: 'gestionEjercicio', component: GestionEjercicioComponent},
  { path: 'plan-alimentacion', component : GestionPlanAlimenticionComponent},
  { path: 'form-plan-alimentacion/:id', component: FormPlanAlimentacionComponent},
  { path: 'form-plan-alimentacion/:id', component: FormPlanAlimentacionComponent},
  { path: 'gestion-planes', component: GestionPlanesComponent},
  { path: 'gestion-planes/plan/:id', component: AltaEditPlanComponent},
  { path: 'publicacion-facebook', component: PublicacionFacebookComponent},
  { path : 'registrar-dieta/:id', component: RegistroDietaComponent},
  { path : 'registrar-dieta/:id', component: RegistroDietaComponent},
  { path: 'estadisticas', component: EstadisticasComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
