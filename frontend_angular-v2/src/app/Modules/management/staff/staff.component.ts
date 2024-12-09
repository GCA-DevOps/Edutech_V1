import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStaffComponent } from './add-staff/add-staff.component';

import { StaffService } from './staff.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { CoreService } from 'src/app/core/core.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'contact',
    'email',
    'gender',
    'doc',
    'action'
    
  ];


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private _dialog: MatDialog,
    private _staffService: StaffService,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.getStaffList();

  }


  openAddStaffForm() {
    const dialogRef=this._dialog.open(AddStaffComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getStaffList();

        }
      }
    })
  }
  getStaffList() {
    this._staffService.getStaffList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;


      },
      error: console.log,



    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStaff(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this staff?');
    if (confirmed) {
    this._staffService.deleteStaff(id).subscribe({
      next: (res) => {
        this._coreService.openSnackbar('Staff Deleted!','done')
       this.getStaffList();
      },
      error: console.log,
    });
  }
}

openEditForm(data:any) {
  const dialogRef = this._dialog.open(AddStaffComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if(val) {
        this.getStaffList();

      }
    }
  })
  
   }
    
    }
