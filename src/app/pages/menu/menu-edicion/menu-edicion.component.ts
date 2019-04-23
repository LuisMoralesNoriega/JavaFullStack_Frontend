import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/_model/menu';
import { FormGroup, FormControl } from '@angular/forms';
import { MenuService } from 'src/app/_service/menu.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {

  menu: Menu;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(private menuService: MenuService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.menu = new Menu();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'icono': new FormControl(''),
      'nombre': new FormControl(''),
      'url': new FormControl(''),
      'roles': new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;

      this.initForm();
    });

  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio hacia el form
      this.menuService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idMenu),
          'icono': new FormControl(data.icono),
          'nombre': new FormControl(data.nombre),
          'url': new FormControl(data.url)
        });
      });
    }
  }

  operar() {
    this.menu.idMenu = this.form.value['id'];
    this.menu.icono = this.form.value['icono'];
    this.menu.nombre = this.form.value['nombre'];
    this.menu.url = this.form.value['url'];

    if (this.edicion) {
      this.menuService.modificar(this.menu).subscribe(() => {
        this.menuService.listar().subscribe(data => {
          this.menuService.menuCambio.next(data);
          this.menuService.mensajeCambio.next('SE MODIFICÓ');
        });
      });
    } else {
      this.menu.idMenu = 0;
      this.menuService.registrar(this.menu).subscribe(() => {
        this.menuService.listar().subscribe(data => {
          this.menuService.menuCambio.next(data);
          this.menuService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['menu']);
  }

}
