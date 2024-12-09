import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { AddRolesComponent } from './add-roles/add-roles.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../../../core/core.service';
import { RolesService } from './roles.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'dateCreated',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _addRolesService: RolesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getRolesList();
  }

  openAddEditUsergroupForm() {
    const dialogRef = this._dialog.open(AddRolesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRolesList();
        }
      },
    });
  }

  getRolesList() {
    this._addRolesService.getRolesList().subscribe({
      next: (res) => {
        const formattedData = res.entity.map((role: any) => {
          return {
            ...role,
            dateCreated: format(new Date(role.dateCreated), 'dd/MM/yyyy hh:mm a')
          };
        });

        this.dataSource = new MatTableDataSource(formattedData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
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

  deleteRoles(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this role?'
    );
    if (confirmed) {
      this._addRolesService.deleteRoles(id).subscribe({
        next: (res) => {
          this._coreService.openSnackBar('One role deleted!');
          this.getRolesList();
        },
        error: (err) => {
          console.error('Error deleting role:', err);
        },
      });
    }
  }

  openUpdateRolesForm(data: any) {
    const dialogRef = this._dialog.open(AddRolesComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getRolesList();
        }
      },
    });
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
          doc.text('Usergroup Report', imgWidth / 2, position, { align: 'center' });

          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

          doc.setFontSize(6);
          doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
        }

        function addFooter() {
          doc.setFontSize(8);
          doc.text('Elimu Pay Technologies | Copyright © 2024 | All rights reserved.',
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
