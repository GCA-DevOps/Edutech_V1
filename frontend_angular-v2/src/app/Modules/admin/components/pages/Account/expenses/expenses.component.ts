import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/@Core/core/core.service';
import { ExpensesService } from './expenses.service';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

// Define the structure of an expense, including expensetypes as a nested object
interface Expense {
  id: number;
  amount: number;
  name: string;
  description: string;
  expensetypes?: { name: string; description: string }; // optional expensetypes property
}

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  displayedColumns: string[] = ['amount', 'name', 'description', 'action'];
  dataSource: MatTableDataSource<Expense> = new MatTableDataSource<Expense>([]); // Only declare it once
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _service: ExpensesService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getExpensesList();
  
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
          doc.text('Supplies Report', imgWidth / 2, position, { align: 'center' });
          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
          const time = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });
          doc.setFontSize(6);
          doc.text(
            `Printed on ${day} ${date} at ${time}`,
            imgWidth - marginRight,
            position,
            { align: 'right' }
          );
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

        doc.save('Expenses Report.pdf');
      });
    } else {
      console.error('Expenses report not available');
    }
  }

  getExpensesList() {
    this.loading = true;
    
    setTimeout(() => {
      this._service.getExpensesList().subscribe({
        next: (res: any) => {
          if (res && Array.isArray(res.expenses)) {
            this.dataSource = new MatTableDataSource<Expense>(res.expenses);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          } else {
            console.error('Expenses data is not an array:', res);
            this.dataSource = new MatTableDataSource<Expense>([]);
          }
          this.loading = false; 
        },
        error: (err: any) => {
          console.error('Error fetching expenses list:', err);
          this.dataSource = new MatTableDataSource<Expense>([]);
          this.loading = false;
        },
      });
    }, 2000); 
  }
  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteExpenses(id: number) {
    if (!id) {
      console.error('Invalid ID provided for deletion');
      return;
    }
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      this._service.deleteExpenses(id).subscribe({
        next: () => {
          this._coreService.openSnackBar('Expense deleted!', 'done');
          this.getExpensesList();
        },
        error: (err) => {
          console.error('Error deleting expense:', err);
        },
      });
    }
  }

  openAddEditExpensesForm() {
    const dialogRef = this._dialog.open(AddExpensesComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpensesList();
        }
      },
    });
  }

  openUpdateExpensesForm(data: any) {
    if (!data) {
      console.error('Invalid data provided for update');
      return;
    }
    const dialogRef = this._dialog.open(AddExpensesComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExpensesList();
        }
      },
      error: (err) => {
        console.error('Error updating expense:', err);
      },
    });
  }

  pay(row: Expense): void {
    console.log('Pay clicked:', row);
    // Implement pay functionality here
  }

  view(row: Expense): void {
    console.log('View clicked:', row);
    // Implement view functionality here
  }

  deactivate(row: Expense): void {
    console.log('Deactivate clicked:', row);
    // Implement deactivate functionality here
  }
}
