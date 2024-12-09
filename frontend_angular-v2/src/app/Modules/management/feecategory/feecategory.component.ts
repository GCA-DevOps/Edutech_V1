import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FeecategoryService } from './service/feecategory.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditComponent } from './add-edit/add-edit.component';
import { CoreService } from '../../../../@Core/core/core.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

interface FeeCategory {
  id: number;
  name: string;
  grade: string;
  term: string;
  amount: number;
  datePosted: Date;

}

@Component({
  selector: 'app-feecategory',
  templateUrl: './feecategory.component.html',
  styleUrls: ['./feecategory.component.css']
})
export class FeeCategoryComponent implements OnInit {

  dataSource: MatTableDataSource<FeeCategory> = new MatTableDataSource<FeeCategory>([]);
  // loading: boolean = false;
  currentPage: number = 1;
  isLoading: boolean = true
 
  feeCategories: any


  constructor(
    private _dialog: MatDialog,
    private feecategoryService: FeecategoryService,
    private _coreService: CoreService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.getFeeCategoryList();
  }


  getFeeCategoryList() {
    this.isLoading = true;  // Start loading
    this.feecategoryService.getFeecategoryList().subscribe({
      next: (res: any) => {
        this.feeCategories = res.entity;
        console.log("fee", this.feeCategories);
        this.isLoading = false;  // Stop loading on success
      },
      error: (err) => {
        this.isLoading = false;  // Stop loading on error
        console.error('Error fetching fee categories:', err);
      }
    });
  }
  
  addFeeCategory( ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "500px"
    dialogConfig.data= {
      
    }

    const dialogRef = this._dialog.open(AddEditComponent, dialogConfig)
    
    dialogRef.afterClosed().subscribe ({
      next:(value) => {
        this.ngOnInit()
      }
    })
  }

  viewFeeCategory(feeCategoryId: string){
    this.router.navigate(['/admin/managementmodule/view', feeCategoryId])
  }

  editFeeCategory(id: number) {
    console.log('Edit Fee Category with ID:', id);
  }

  deleteFeeCategory(id: number) {
    console.log('Delete Fee Category with ID:', id);
  }

  

  // Edit fee category
  // editFeeCategory(id: number) {
  //   this._feecategoryService.getFeeCategoryById(id).subscribe({
  //     next: (feeCategoryData) => {
  //       console.log('Opening dialog to edit category with ID:', id);
  //       // Ensure the ID is included in the object passed to the dialog
  //       const dialogRef = this._dialog.open(AddEditComponent, { data: { ...feeCategoryData, id } });
  //       dialogRef.afterClosed().subscribe(() => this.getFeeCategoryList());
  //     },
  //     error: (err) => {
  //       console.error('Error fetching fee category data:', err);
  //     }
  //   });
  // }
  
  // // Delete fee category with optimistic UI update
  // deleteFeeCategory(id: number) {
  //   if (window.confirm('Are you sure you want to delete this fee category?')) {
  //     const index = this.dataSource.data.findIndex(item => item.id === id);
  //     if (index > -1) {
  //       const deletedItem = this.dataSource.data[index];  // Store the deleted item
  //       this.dataSource.data = this.dataSource.data.filter(item => item.id !== id); // Optimistic delete

  //       this._feecategoryService.deleteFeecategory(id).subscribe({
  //         next: () => {
  //           this._coreService.openSnackBar('Fee Category deleted!', 'done');
  //           this.getFeeCategoryList(); // Refresh the list after deletion
  //         },
  //         error: (err) => {
  //           console.error('Error deleting fee category:', err);
  //           // Rollback optimistic update if needed
  //           this.dataSource.data.push(deletedItem);
  //           this.dataSource.data = [...this.dataSource.data]; // Trigger table update
  //         }
  //       });
  //     }
  //   }
  // }

  // Apply filter to the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Pagination handler
  pageEvent(event: any) {
    this.currentPage = event.pageIndex + 1;
  }

  // Generate PDF report for fee categories
  generatePdf() {
    const doc = new jsPDF();
    const headers = ['Name', 'Grade', 'Term', 'Amount'];
    const rows = this.dataSource.data.map(row => [row.name, row.grade, row.term, row.amount]);

    doc.setFontSize(12);
    doc.text('Fee Categories', 14, 10);

    const colWidths = [40, 30, 30, 30];
    let y = 20;

    // Set headers with bold text
    doc.setFont('helvetica', 'bold');
    headers.forEach((header, index) => {
      doc.text(header, 14 + (index * colWidths[index]), y);
    });

    y += 10;

    // Add rows with normal font
    doc.setFont('helvetica', 'normal');
    rows.forEach(row => {
      row.forEach((cell, index) => {
        doc.text(cell.toString(), 14 + (index * colWidths[index]), y);
      });
      y += 10;
    });

    // Save the PDF
    doc.save('FeeCategories.pdf');
  }
}
