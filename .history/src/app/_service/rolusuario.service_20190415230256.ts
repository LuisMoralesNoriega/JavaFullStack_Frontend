import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';


@Injectable({
    providedIn: 'root'
})

export class RolUsuarioService {

    // tslint:disable-next-line:no-inferrable-types
    urlusuario: string = `${HOST}/usuarios`;

    



}
