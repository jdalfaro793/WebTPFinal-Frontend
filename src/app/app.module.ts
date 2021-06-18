import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AsistenciaComponent } from './components/asistencia/asistencia.component';
import { NgxDataTableModule} from "angular-9-datatable";
import { RutinaComponent } from './components/rutina/rutina.component';
import { LoginComponent } from './components/login/login.component';
import { GestionCuotaComponent } from './components/cuota/gestion-cuota/gestion-cuota.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AsistenciaComponent,
    RutinaComponent,
    LoginComponent,
    GestionCuotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDataTableModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
