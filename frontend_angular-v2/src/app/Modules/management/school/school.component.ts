import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';
import { SchoolService } from './school.service';
import { AddSchoolComponent } from './add-school/add-school.component';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'city',
    'county',
    'sub_county',
    'country',
    'country_code',
    'street_address',
    'email',
    'school_type',
    'date_created',
    'boarding_status',
    'postal_code',
    'phone_number1',
    'phone_number2',
    'action',
  ];
  filteredData: any[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _SchoolService: SchoolService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSchoolList();
  }

  ngAfterViewInit() {
    // Initialize paginator and sort after view initialization
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddEditSchoolForm() {
    const dialogRef = this._dialog.open(AddSchoolComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSchoolList();
        }
      },
    });
  }

  getSchoolList() {
    this._SchoolService.getSchoolList().subscribe({
      next: (res: any) => {
        if (res && res.results) {
          this.filteredData = res.results; // Set filtered data
          this.dataSource.data = this.filteredData; // Ensure dataSource gets the filtered data
        } else {
          console.log('No results found');
        }
      },
      error: (err) => console.error('Error fetching school list:', err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSchool(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this school?');
    if (confirmed) {
      this._SchoolService.deleteSchool(id).subscribe({
        next: (res: any) => {
          this._coreService.openSnackBar('School deleted!', 'done');
          this.getSchoolList();
        },
        error: (err) => console.error('Error deleting school:', err),
      });
    }
  }

  openUpdateSchoolForm(data: any) {
    const dialogRef = this._dialog.open(AddSchoolComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSchoolList();
        }
      },
    });
  }
}
