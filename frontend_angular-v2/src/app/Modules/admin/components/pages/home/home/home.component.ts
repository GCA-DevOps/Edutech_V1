import { Component, OnInit } from "@angular/core";
import { HomecardsService } from "./homecards.service";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalIncomes: number = 0;
  totalExpenses: number = 0;
  totalSupplierAmount: number = 0;
  transactions: any[] = [];
  showTransactionHistory: boolean = false;
  totalProfit: number = 0; // Net income will now be dynamically calculated
  totalStudents: number = 0;
  feeCollections: any;
  admin: any;
  isLoading: boolean = true;

  constructor(private homecardsService: HomecardsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.reloadData();
    this.fetchTotalStudents(); // Fetch total students data
  }

  reloadData() {
    // Start loading state
    this.isLoading = true;

    // Fetch total incomes
    this.homecardsService.getTotalIncome().subscribe(
      (data: any) => {
        console.log('API Response for Total Incomes:', data);
        if (data && data['entity'] && Array.isArray(data['entity'])) {
          this.transactions = data['entity'];
          this.calculateTotalIncome();
        } else {
          console.error('Invalid API response format for Total Incomes.');
        }
        this.updateNetIncome(); // Update net income whenever total income changes
      },
      (error: any) => {
        console.error('Error fetching total incomes:', error);
        this.isLoading = false; // Stop loading on error
      }
    );

    // Fetch total expenses
    this.homecardsService.getTotalExpenses().subscribe(
      (data: any) => {
        console.log('API Response for Total Expenses:', data);
        if (data && data['total_expenses'] !== undefined) {
          this.totalExpenses = data['total_expenses'];
        } else {
          console.error('Invalid API response format for Total Expenses.');
        }
        this.updateNetIncome(); // Update net income whenever total expenses change
      },
      (error: any) => {
        console.error('Error fetching total expenses:', error);
        this.isLoading = false; // Stop loading on error
      }
    );

    // Fetch total supplier amount
    this.homecardsService.getTotalSupplierAmount().subscribe(
      (data: any) => {
        console.log('API Response for Total Supplier Amount:', data);
        if (data && data['supplier Collection'] !== undefined) {
          this.totalSupplierAmount = data['supplier Collection'];
        } else {
          console.error('Invalid API response format for Total Supplier Amount.');
        }
      },
      (error: any) => {
        console.error('Error fetching total supplier amount:', error);
        this.isLoading = false; // Stop loading on error
      }
    );
  }

  // Method to calculate total income
  calculateTotalIncome() {
    this.totalIncomes = this.transactions.reduce((sum, transaction) => sum + (transaction.debit || 0), 0);
    console.log('Total Income:', this.totalIncomes);
  }

  // Method to update net income dynamically
  updateNetIncome() {
    this.totalProfit = this.totalIncomes - this.totalExpenses;
    console.log('Net Income (Total Profit):', this.totalProfit);
  }

  // Method to fetch total students
  fetchTotalStudents() {
    this.homecardsService.getTotalStudents().subscribe(
      (data: any) => {
        console.log('API Response for Total Students:', data);
        if (data && data['entity'] && Array.isArray(data['entity'])) {
          this.totalStudents = data['entity'].length; // Calculate total students
        } else {
          console.error('Invalid API response format for Total Students.');
        }
        this.isLoading = false; // End loading state after all data is fetched
      },
      (error: any) => {
        console.error('Error fetching total students:', error);
        this.isLoading = false; // End loading state even if there is an error
      }
    );
  }

  toggleTransactionHistory() {
    this.showTransactionHistory = !this.showTransactionHistory;
  }

  openDialog() {
    // Implement your logic to open dialog here
  }
}
