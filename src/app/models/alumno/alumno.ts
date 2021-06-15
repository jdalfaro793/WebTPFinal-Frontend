import { Plan } from "../plan/plan";
import { RutinaPersonalizada } from "../rutinaPersonalizada/rutina-personalizada";
import { Usuario } from "../usuario/usuario";

export class Alumno {
    _id:string;
    alu_apellido: string;          
    alu_nombre: string;        
    alu_dni: string;             
    alu_fecha_nacimiento: Date;  
    alu_celular: string;           
    alu_domicilio: string;       
    alu_email: string;           
    alu_fechaInicio: Date;     
    alu_plan: Plan;            
    alu_rutinas: Array<RutinaPersonalizada>;    
    alu_usuario: Usuario; 
}        