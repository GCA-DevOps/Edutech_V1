import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

import { AddSuppliesComponent } from './add-supplies/add-supplies.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/@Core/core/core.service';
import { SuppliesService } from './supplies.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {

  generatePdf() {
    // Get the table-container div
    const tableContainer = document.querySelector('.table-container');

    // Check if the table-container div exists
    if (tableContainer) {
        // Convert the content of table-container to a canvas
        html2canvas(tableContainer as HTMLElement).then((canvas) => {
            // Convert canvas to PDF using jsPDF with landscape orientation
            const doc = new jspdf('l', 'mm', 'a4'); // 'l' for landscape
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 280; // Adjusted A4 width in mm with margins
            const pageHeight = 210; // A4 height in mm (landscape orientation)
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 10; // Adjust margin top here
            const marginLeft = 5; // Adjust left margin
            const marginRight = 3; // Adjust right margin

            function addHeader() {
                doc.setFontSize(12);
                doc.text('Supplies Report', imgWidth / 2, position, { align: 'center' }); // Header text position

                // Get current date and time
                const now = new Date();
                const day = now.toLocaleDateString('en-US', { weekday: 'long' }); // Get the full name of the day
                const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
                const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

                // Add printed date and time
                doc.setFontSize(6);
                doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
            }

            function addFooter() {
                doc.setFontSize(8);
                doc.text('Elimu Pay Technologies | Copyright © 2024 | All rights reserved.',
                    imgWidth / 2, // X position (center)
                    doc.internal.pageSize.getHeight() - 5, // Y position (5mm from bottom)
                    { align: 'center' }
                );
            }

            addHeader(); // Add header to the first page
            addFooter(); // Add footer to the first page

            doc.addImage(imgData, 'PNG', marginLeft, position + 10, imgWidth - marginLeft - marginRight, imgHeight); // Adjust position to make space for header and printed date/time
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight + 10; // Adjust margin top here
                doc.addPage();
                addHeader(); // Add header to subsequent pages
                addFooter(); // Add footer to subsequent pages
                doc.addImage(imgData, 'PNG', marginLeft, position + 20, imgWidth - marginLeft - marginRight, imgHeight); // Adjust position to make space for header and printed date/time
                heightLeft -= pageHeight;
            }

            // Save the PDF
            doc.save('Supplies Report.pdf');
        });
    } else {
        console.error('Supplies report not available');
    }
}







  displayedColumns: string[] = [
    // 'id',
    'businessName',
    'supplieridNO',
    'prefix',
    // 'usergroup',
    // 'phoneNumber',
    'firstname',
    // 'idNumber',
    'middlename',
    // 'date_of_birth',
    // 'school_name',
    'lastname',
    // 'phoneNumber',
    'phoneNumber',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _addSuppliesService: SuppliesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSuppliesList();
  }
  // getSuppliesList() {
  //   throw new Error('Method not implemented.');
  // }
  // getSuppliesList() {
  //   throw new Error('Method not implemented.');
  // }

  openAddEditSuppliesForm() {
    const dialogRef = this._dialog.open(AddSuppliesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSuppliesList();
        }
      },
    });
    // setTimeout(() => {
    //   const formElement = document.querySelector('.mat-form-field');
    //   if (formElement) {
    //     formElement.dispatchEvent(new Event('click'));
    //   }
    // }, 100);
  }

  getSuppliesList() {
    this._addSuppliesService.getSuppliesList().subscribe({
      next: (res:any) => {
        console.log("data", res);
        
        this.dataSource = new MatTableDataSource(res.results);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err:any) => {
        console.error('Error fetching user list:', err);
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
  deleteSupplies(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this system user?'
    );
    if (confirmed) {
      this._addSuppliesService.deleteSupplies(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('System user deleted!', 'done');
          this.getSuppliesList();
        },
        error: console.error, // Handle error appropriately
      });
    }
  }

  openUpdateSuppliesForm(data: any) {
    const dialogRef = this._dialog.open(AddSuppliesComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSuppliesList();
        }
      },
    });
  }
}

