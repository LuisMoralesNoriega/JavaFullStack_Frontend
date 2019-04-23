import { Injectable } from '@angular/core';
import { Rol } from '../_model/rol';
import { Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from '../_shared/var.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
    providedIn: 'root'
})

export class RolService {

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();

  url:string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Rol[]>(`${this.url}/roles`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorId(idrol: number) {
    return this.http.get<Rol>(`${this.url}/roles/${idrol}`);
  }

  registrar(rol: Rol) {
    return this.http.post(`${this.url}/roles`, rol);
  }

  modificar(rol: Rol) {
    return this.http.put(`${this.url}/roles`, rol);
  }

}