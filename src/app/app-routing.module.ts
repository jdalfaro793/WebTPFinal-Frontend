import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { RutinaComponent } from './components/rutina/rutina.component';
import { LoginComponent } from './components/login/login.component';
import { GestionCuotaComponent } from './components/cuota/gestion-cuota/gestion-cuota.component';

const routes: Routes = [
  { path: 'asistencia/:id',component: AsistenciaComponent },
  { path: 'rutinapersonal/:id',component: RutinaComponent },
  { path: 'login',component: LoginComponent },
  { path: 'gestion-cuota', component: GestionCuotaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
