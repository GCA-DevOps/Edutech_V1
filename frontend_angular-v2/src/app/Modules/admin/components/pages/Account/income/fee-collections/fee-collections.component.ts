import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ViewtranscationComponent } from '../viewtranscation/viewtranscation.component';
import { AddRolesComponent } from 'src/app/Modules/management/sytem-users/roles/add-roles/add-roles.component';
import { PayFeeComponent } from 'src/app/Modules/management/pay-fee/pay-fee.component';

interface Transaction {
  student_id: string;
  student__uniqueId: string;
  transaction_date: string;
  transaction_id: string;
  description: string;
  credit: number;
  debit: number;
  balance: number;
}

@Component({
  selector: 'app-fee-collections',
  templateUrl: './fee-collections.component.html',
  styleUrls: ['./fee-collections.component.css']
})
export class FeeCollectionsComponent implements OnInit, AfterViewInit {
  totalFeeEndpoint = `${environment.apiUrl}payfee/calculate_total_fee/`;
  transactionsEndpoint = `${environment.apiUrl}payfee/api/v1/fee/list_transaction`;

  displayedColumns: string[] = [
    'student_id',
    'student__uniqueId',
    'description',
    'transaction_date',
    'credit',
    'debit',
    'balance',
    'action',
  ];
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  feeCollection: any;
  cards: any[] = [{ amount: '' }];
  transactions: Transaction[] = [];

  constructor(
    private _dialog: MatDialog,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchTotalFeeCollections();
    this.fetchTransactions();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onRowClick(event: Event): void {
    const target = event.target as HTMLElement;
    const row = target.closest('tr');
    if (row) {
      const rows = Array.from(document.querySelectorAll('.clickable-row'));
      rows.forEach(r => r.classList.remove('row-selected'));
      row.classList.add('row-selected');
    }
  }

  fetchTotalFeeCollections(): void {
    this.http.get<any>(this.totalFeeEndpoint).subscribe({
      next: (data) => {
        this.feeCollection = data['Fee Collection'];
        this.cards[0].amount = `Ksh ${this.feeCollection}`;
      },
      error: (error) => {
        console.error('Error fetching total fee collections:', error);
      }
    });
  }

  fetchTransactions(): void {
    console.log('Fetching transactions from:', this.transactionsEndpoint);
    this.http.get<any>(this.transactionsEndpoint).subscribe({
      next: (data) => {
        console.log('Transactions data received:', data);
        this.transactions = data.entity;
        this.dataSource.data = this.transactions;
        console.log('DataSource data:', this.dataSource.data);
      },
      error: (error) => {
        console.error('Error fetching transactions:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  generatePdf(): void {
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
          doc.text('Fee Category', imgWidth / 2, position, { align: 'center' });
          const now = new Date();
          const day = now.toLocaleDateString('en-US', { weekday: 'long' });
          const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          doc.setFontSize(6);
          doc.text(`Printed on ${day} ${date} at ${time}`, imgWidth - marginRight, position, { align: 'right' });
        }

        addHeader();

        doc.addImage(imgData, 'PNG', marginLeft, position + 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        if (heightLeft >= 0) {
          doc.addPage();
        }
        doc.save('transaction_history.pdf');
      });
    }
  }

  openDialog(row: any): void {
    this._dialog.open(ViewtranscationComponent, {
      data: row
    });
  }

  PayFeeForm(): void {
    this._dialog.open(PayFeeComponent, {
      width: '800px',
      height: 'auto'
    });
  }
}
