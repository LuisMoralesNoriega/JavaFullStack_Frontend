import { Rol } from './rol';

export class Usuario {
    idUsuario: number;
    nombre: string;
    password: string;
    enabled: boolean;
    roles: Rol[];
}
