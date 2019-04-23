import { Usuario } from './../../_model/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolusuario',
  templateUrl: './rolusuario.component.html',
  styleUrls: ['./rolusuario.component.css']
})
export class RolusuarioComponent implements OnInit {

  usuario: Usuario[] = [];

  constructor() { }

  ngOnInit() {
  }

}
