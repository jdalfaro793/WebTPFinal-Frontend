import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  accion: string ;

  constructor(private activatedRoute: ActivatedRoute,
              private planService: PlanService,
              private usuarioService: UsuarioService,
              private alumnoService: AlumnoService,
              private toastr: ToastrService,
              private router: Router,
            ) { }

  ngOnInit(): void {
    this.iniciarVariables();
    this.cargarPlanes();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id == "0"){
          this.accion = "new";
         }else{
           this.accion = "update";
           this.cargarAlumno(params.id);
         }
    });
    this.usuarioValido = true;
    
  }

  iniciarVariables(){
    this.alumno = new Alumno();
    this.alumno.usuario = new Usuario();
    this.alumno.plan = new Plan();
    this.usuario = new Usuario();
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
    this.alumno.mes = 0;
    this.alumno.ultimaRutinaMes = 0;
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
                if(result.status=="1"){
                  this.toastr.success("El alumno fue guardado correctamente", "OPERACION EXITOSA");
                  this.alumno = new Alumno();
                  this.usuario = new Usuario();
                  formAlumno.resetForm();
                  this.router.navigate(["gestionAlumno"]);
                }else{
                  this.toastr.error("Error al guardar el alumno", "OPERACION FALLIDA");
                }
              },
              error =>{
                console.log(error);
                this.toastr.error("Error al guardar el alumno", "OPERACION FALLIDA");
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
        this.toastr.error("Error al guardar el usuario", "OPERACION FALLIDA");
      }
    )
  }

  validarUserName(input:NgModel):void{
    if(this.usuario.username!="" && this.usuario.username != null){
      this.usuarioService.validarUsername(this.usuario.username).subscribe(
        result=>{
          if(result != null){
            this.usuarioValido=false;
            this.toastr.warning("El nombre de usuario ya existe");
            this.usuario.username = "";
            input.reset();
          }else{
            this.usuarioValido = true;
          }
        },
        error=>{
          console.error(error);
        }
      )
    }
  }

  cargarAlumno(id: string){
    this.alumnoService.getAlumno(id).subscribe(
      result=>{
        let vAlumno = new Alumno();
        Object.assign(vAlumno, result);
        this.alumno = vAlumno;
        this.alumno.plan = this.planes.find(a=>(a._id == this.alumno.plan._id));
        this.usuario = this.alumno.usuario;
      },
      error=>{}
    )
  }

  modificarAlumno(formAlumno: NgForm){
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      result=>{
        this.usuarioService.getUsuario(this.usuario.username, this.usuario.password).subscribe(
          result=>{
            this.usuario = new Usuario();
            Object.assign(this.usuario,result);
            this.alumno.usuario = this.usuario;
            this.alumnoService.updateAlumno(this.alumno).subscribe(
              result => {
                if(result.status=="1"){
                  this.toastr.success("El alumno fue modificado correctamente", "OPERACION EXITOSA");
                  this.alumno = new Alumno();
                  this.usuario = new Usuario();
                  formAlumno.resetForm();
                  this.router.navigate(["gestionAlumno"]);
                }else{
                  this.toastr.error("Error al modificar el alumno", "OPERACION FALLIDA");
                }
              },
              error =>{
                console.log(error);
                this.toastr.error("Error al modificar el alumno", "OPERACION FALLIDA");
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
        this.toastr.error("Error al modificar el usuario", "OPERACION FALLIDA");
      }
    )
  }

  cancelar(){
    this.router.navigate(["gestionAlumno"]);
  }
}




