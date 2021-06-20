import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alumno } from 'src/app/models/alumno/alumno';
import { Plan } from 'src/app/models/plan/plan';
import { Usuario } from 'src/app/models/usuario/usuario';
import { AlumnoService } from 'src/app/services/alumno/alumno.service';
import { PlanService } from 'src/app/services/plan/plan.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-form-alumno',
  templateUrl: './form-alumno.component.html',
  styleUrls: ['./form-alumno.component.css']
})
export class FormAlumnoComponent implements OnInit {

  planes:Array<Plan>;
  plan:Plan;
  alumno:Alumno;
  usuario:Usuario;
  usuarioValido:boolean;
  constructor(
    private planService: PlanService,
    private usuarioService: UsuarioService,
    private alumnoService: AlumnoService
  ) { }

  ngOnInit(): void {
    this.alumno = new Alumno();
    this.usuario = new Usuario();
    this.usuarioValido = true;
    this.cargarPlanes();
  }

  cargarPlanes():void{
    this.planes = new Array<Plan>();
    this.planService.getPlans().subscribe(
      result =>{
        result.forEach(element => {
          let p = new Plan();
          Object.assign(p,element);
          this.planes.push(p);
        });
      },
      error=>{
        console.log(error);
        console.log("Error al intentar cargar lista de planes disponibles");
      }
    )
  }
  guardarAlumno(formAlumno: NgForm){
    this.alumno.fecha_inicio = new Date();
    console.log(this.alumno.fecha_inicio);
    this.usuario.state = true;
    this.usuario.rol= "alumno";
    this.usuarioService.addUsuario(this.usuario).subscribe(
      result=>{
        console.log(result);
        this.usuarioService.getUsuario(this.usuario.username, this.usuario.password).subscribe(
          result=>{
            this.usuario = new Usuario();
            Object.assign(this.usuario,result);
            this.alumno.usuario = this.usuario;
            this.alumnoService.addAlumno(this.alumno).subscribe(
              result => {
                console.log(result);
                console.log("usuario agregado con exito");
                this.alumno = new Alumno();
                this.usuario = new Usuario();
                formAlumno.resetForm();
              },
              error =>{
                console.log(error);
              }
            )
          },
          error =>{
            console.log(error);
          }
        )
      },
      error=>{
        console.log(error);
      }
    )

  }
  validarUserName():void{
  
  }
}


