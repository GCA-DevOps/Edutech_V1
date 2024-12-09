
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FeesDataSource, FeesItem } from './fees-datasource';
import { AdminServiceService } from 'src/app/Modules/admin/service/admin-service.service';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FeesItem>;
  dataSource = new FeesDataSource();

  constructor(private adminservice:AdminServiceService){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','name','name','name','name','name'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.adminservice.feeStatement
    //getJsonData().subscribe(data => {
     // this.atmData = data.entity;
      //console.log(this.atmData, "atm data");
      //console.log(data);
    //})
  }}
