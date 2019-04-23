import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rolservice';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns = ['idRol', 'descripcion', 'nombre'];
  dataSource: MatTableDataSource<Rol>;  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private rolService: RolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.rolService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }); 
  }

}
