import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../@Core/core/core.service';
import { ParentService } from './parent.service';
import { AddParentComponent } from './add-parent/add-parent.component';

import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'parentIdno',
    'email',
    'action',
  ];
  dataSource = new MatTableDataSource<any>([]);
  sidebarOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _parentService: ParentService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getParentList();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getParentList() {
    this._parentService.getParentList().subscribe({
      next: (res: any) => {
        console.log('API Response:', res); // Log the API response for debugging

        // Check if the response contains 'results' and it is an array
        if (res && Array.isArray(res.results)) {
          this.dataSource = new MatTableDataSource(res.results);

          // Bind paginator and sort
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          // Notify Angular of changes in the data source
          this.dataSource._updateChangeSubscription();

          // Debugging logs
          console.log('Data successfully loaded:', res.results);
          console.log('Total items:', this.dataSource.data.length);
        } else {
          console.error('Invalid API response format.');
        }
      },
      error: (err) => {
        console.error('An error occurred while fetching parents:', err);
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

  deleteParent(id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this parent?');
    if (confirmed) {
      this._parentService.deleteParent(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('Parent deleted!', 'done');
          this.getParentList();
        },
        error: (err) => {
          console.error('Error deleting parent:', err);
        },
      });
    }
  }

  openAddEditParentForm(data: any = null) {
    const dialogRef = this._dialog.open(AddParentComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getParentList();
        }
      },
    });
  }

  openUpdateParentForm(data: any) {
    this.openAddEditParentForm(data);
  }

  generatePdf() {
    const tableContainer = document.querySelector('.table-container');

    if (tableContainer) {
      html2canvas(tableContainer as HTMLElement).then((canvas) => {
        const doc = new jspdf('l', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 280;
        const pageHeight = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 10;
        const marginLeft = 5;
        const marginRight = 3;

        function addHeader() {
          doc.setFontSize(12);
          doc.text('System Users Report', imgWidth / 2, position, { align: 'center' });

          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

          doc.setFontSize(6);
          doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
        }

        function addFooter() {
          doc.setFontSize(8);
          doc.text(
            'Elimu Pay Technologies | Copyright © 2024 | All rights reserved.',
            imgWidth / 2,
            doc.internal.pageSize.getHeight() - 5,
            { align: 'center' }
          );
        }

        addHeader();
        addFooter();
        doc.addImage(imgData, 'PNG', marginLeft, position + 10, imgWidth - marginLeft - marginRight, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight + 10;
          doc.addPage();
          addHeader();
          addFooter();
          doc.addImage(imgData, 'PNG', marginLeft, position + 20, imgWidth - marginLeft - marginRight, imgHeight);
          heightLeft -= pageHeight;
        }

        doc.save('System Users Report.pdf');
      });
    } else {
      console.error('System users reports not available');
    }
  }
}
