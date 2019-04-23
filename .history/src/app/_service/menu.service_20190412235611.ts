import { Subject } from 'rxjs';
import { Menu } from './../_model/menu';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/var.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MenuService {

  menuCambio = new Subject<Menu[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${HOST}`;

  constructor(private http: HttpClient) { }

  listar() {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Menu[]>(`${this.url}/menus`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorId(idmenu: number) {
    return this.http.get<Menu>(`${this.url}/menus/${idmenu}`);
  }

  registrar(menu: Menu) {
    return this.http.post(`${this.url}/menus`, menu);
  }

  modificar(menu: Menu) {
    return this.http.put(`${this.url}/menus`, menu);
  }

  eliminar(idmenu: number) {
    return this.http.delete(`${this.url}/menus/${idmenu}`);
  }

  listarPorUsuario(nombre: string) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post<Menu[]>(`${this.url}/menus/usuario`, nombre, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

}
