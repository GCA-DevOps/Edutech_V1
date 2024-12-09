
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../../../../../@Core/core/core.service';
import { IncomeTypesService } from './income-types.service';

@Component({
  selector: 'app-system-users',
  templateUrl: './income-types.component.html',
  styleUrls: ['./income-types.component.css'],
})
export class IncomeTypesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'email',
    'gender',
    'address',
    'nationality',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  feeCollection: number = 0; // Define the feeCollection property

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _incomeTypesService: IncomeTypesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSystemUserList();
    this.fetchFeeCollection();
  }

  

  getSystemUserList() {
    this._incomeTypesService.getSystemUserList().subscribe({
      next: (res: any[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  fetchFeeCollection() {
    this._incomeTypesService.getFeeCollection().subscribe({
      next: (res: any) => {
        this.feeCollection = res['Fee Collection'];
        console.log('Fee Collection:', this.feeCollection);
      },
      error: (error: any) => {
        console.error('Error fetching fee collection:', error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSystemUser(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this system user?'
    );
    if (confirmed) {
      this._incomeTypesService.deleteSystemUser(id).subscribe({
        next: () => {
          this._coreService.openSnackBar('System user deleted!', 'done');
          this.getSystemUserList();
        },
        error: console.error,
      });
    }
  }

 
}
