import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './student.service';
import { AddStudentComponent } from './add-student/add-student.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ViewStudentFeeComponent } from './view-student-fee/view-student-fee.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'uniqueId',
    'firstName',
    'middleName',
    'lastName',
    'studentGender',
    'admNumber',
    'grade',
    'stream',
    'dateOfAdmission',
    'dob',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getStudentList(0, 10); // Initial fetch for page 0 with size 10
  }

  getStudentList(pageIndex: number, pageSize: number): void {
    this._studentService.getStudentList(pageIndex, pageSize).subscribe({
      next: (res: any) => {
        
        console.log("st", res)
        this.dataSource.data = res.results;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // Update paginator length based on total count from API
        this.paginator.length = res.totalCount;
      },
      error: (err) => {
        console.log('Error fetching student list:', err);
      },
    });
  }

  onPageChange(event: any): void {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    this.getStudentList(pageIndex, pageSize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to first page after filtering
    }
  }

  openFeeStructure(data:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "700px"
    dialogConfig.width = "700px"
    dialogConfig.data= {
      studentId: data.id,
      studentName: data.firstName+" "+data.lastName
    }

    const dialogRef = this._dialog.open(ViewStudentFeeComponent, dialogConfig)
    
  }

 

  openAddEditStudentForm(): void {
    const dialogRef = this._dialog.open(AddStudentComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Refresh to first page after adding/editing a student
          this.getStudentList(0, this.paginator.pageSize);
        }
      },
    });
  }

  deleteStudent(id: number): void {
    const url = `${environment.apiUrl}students/students/${id}/delete/`;

    const dialogRef = this._dialog.open(DeleteConfirmationComponent, {
      data: { url: url },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http.delete(url).subscribe({
          next: () => {
            console.log('Student deleted successfully');
            this.handleDeletionUpdate();
          },
          error: (error) => {
            console.error('Error deleting student:', error);
            alert('Failed to delete student. Please check the server logs.');
          },
        });
      }
    });
  }

  handleDeletionUpdate(): void {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    // Reload data for the current page or adjust pageIndex if the current page becomes empty
    this._studentService.getStudentList(pageIndex, pageSize).subscribe({
      next: (res: any) => {
        if (res.entity.length === 0 && pageIndex > 0) {
          // If no data on the current page, go to the previous page
          this.paginator.pageIndex = pageIndex - 1;
          this.getStudentList(this.paginator.pageIndex, pageSize);
        } else {
          // Update table with new data
          this.dataSource.data = res.entity;
          this.paginator.length = res.totalCount;
        }
      },
      error: (err) => {
        console.log('Error refreshing student list:', err);
      },
    });
  }
 
  openUpdateStudentForm(body: any): void {
    let data = {
      data: body,
      action: "edit"
    }
    
    const dialogRef = this._dialog.open(AddStudentComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Refresh to current page after editing
          this.getStudentList(this.paginator.pageIndex, this.paginator.pageSize);
        }
      },
    });
  }
}
