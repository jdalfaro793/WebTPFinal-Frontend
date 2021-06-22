import { Plan } from "../plan/plan";
import { Usuario } from "../usuario/usuario";

export class Alumno {
    _id:string;
    apellido: string;          
    nombre: string;        
    dni: string;             
    fecha_nacimiento: Date;  
    celular: string;           
    domicilio: string;       
    email: string;           
    fecha_inicio: Date;     
    plan: Plan;            
    usuario: Usuario;
    mes: number;
    
     
    constructor() {}
}        