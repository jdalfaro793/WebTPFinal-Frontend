import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { NgxDataTableModule} from "angular-9-datatable";
import { LoginComponent } from './components/login/login.component';
import { GestionCuotaComponent } from './components/cuota/gestion-cuota/gestion-cuota.component';
import { FormsModule } from '@angular/forms';
import { FormAlumnoComponent } from './components/form-alumno/form-alumno/form-alumno.component';
import { GestionAlumnosComponent } from './components/entrenador/gestion-alumnos/gestion-alumnos.component';
import { MisCuotasComponent } from './components/cuota/mis-cuotas/mis-cuotas.component';
import { MiPlanComponent } from './components/plan/mi-plan/mi-plan.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { GestionRutinaComponent } from './components/rutina/gestion-rutina/gestion-rutina.component';
import { MisRutinasComponent } from './components/rutina/mis-rutinas/mis-rutinas.component';
import { MisAsistenciasComponent } from './components/asistencia/mis-asistencias/mis-asistencias.component';
import { GestionarAsistenciaComponent } from './components/entrenador/gestionar-asistencia/gestionar-asistencia.component';
import { GestionarCuotaComponent } from './components/entrenador/gestionar-cuota/gestionar-cuota.component';
import { DiaPipe } from './pipes/dia.pipe';
import { DatePipe } from '@angular/common';
import { GestionPlanAlimenticionComponent } from './components/dieta/gestion-plan-alimenticion/gestion-plan-alimenticion.component';
import { FormPlanAlimentacionComponent } from './components/dieta/form-plan-alimentacion/form-plan-alimentacion.component';
import { GestionEjercicioComponent } from './components/entrenador/gestion-ejercicio/gestion-ejercicio.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { UsuarioService } from './services/usuario/usuario.service';
import { GestionarRutinaComponent } from './components/entrenador/gestionar-rutina/gestionar-rutina.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    GestionCuotaComponent,
    FormAlumnoComponent,
    GestionAlumnosComponent,
    MisCuotasComponent,
    MiPlanComponent,
    GestionRutinaComponent,
    MisRutinasComponent,
    MisAsistenciasComponent,
    GestionarAsistenciaComponent,
    GestionarCuotaComponent,
    DiaPipe,
    GestionPlanAlimenticionComponent,
    FormPlanAlimentacionComponent,
    GestionEjercicioComponent,
    GestionarRutinaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlifeFileToBase64Module,
    HttpClientModule,
    NgxDataTableModule,
    FormsModule,CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [DatePipe, UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
