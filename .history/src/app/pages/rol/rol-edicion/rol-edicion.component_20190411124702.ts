import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { FormGroup, FormControl } from '@angular/forms';
import { RolService } from 'src/app/_service/rolservice';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

  rol: Rol;
  form: FormGroup;
  edicion: boolean;
  id: number;

  constructor(private rolService: RolService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.rol = new Rol();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'descripcion': new FormControl(''),
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
      this.rolService.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'id': new FormControl(data.idRol),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
    }
  }

  operar() {
    this.rol.idRol = 0;    
    this.rol.nombre = this.form.value['nombre'];
    this.rol.descripcion = this.form.value['descripcion'];

    if (this.edicion) {
      this.rolService.modificar(this.rol).subscribe(() => {
        this.rolService.listar().subscribe(data => {
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE MODIFICÓ');
        });
      })
    } else {
      console.log(this.rol);
      this.rolService.registrar(this.rol).subscribe(() => {
        this.rolService.listar().subscribe(data => {
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE REGISTRÓ');
        });
      });
    }

    this.router.navigate(['rol']);
  }

}
