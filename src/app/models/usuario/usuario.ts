export class Usuario {
  _id:string;
  username: string;
  password: string;
  rol: string;

  Usuario(id?:string, username?:string, password?:string, rol?:string){
     this._id = id;
     this.username = username;
     this.password = password;
     this.rol = rol;
  }
}
