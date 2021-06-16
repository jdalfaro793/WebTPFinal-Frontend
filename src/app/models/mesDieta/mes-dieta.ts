import { Dieta } from "../dieta/dieta";

export class MesDieta {
    _id:string;
    mes: number;
    planSemanal: Array<Dieta>;
    objetivo: string;
    
    constructor() {}
}
