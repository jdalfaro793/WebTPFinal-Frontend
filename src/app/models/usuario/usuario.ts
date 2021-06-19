export class Usuario {
    _id: string;
    username: string;
    password: string;
    state: Boolean;
    rol: string;

    Usuario(username?: string, password?: string, state?: Boolean, rol?: string) {
        this.state = state;
        this.username = username;
        this.password = password;
        this.rol = rol;
    }
}
