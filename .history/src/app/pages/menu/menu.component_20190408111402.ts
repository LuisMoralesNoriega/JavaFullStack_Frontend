import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['idMenu', 'icono', 'nombre', 'url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private menuService: MenuService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.listar();

  }

  listar() {
    this.menuService.listar().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


}
