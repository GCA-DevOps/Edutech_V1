import { Component, OnInit, Inject } from '@angular/core'; // Import Inject decorator
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewtranscation',
  templateUrl: './viewtranscation.component.html',
  styleUrls: ['./viewtranscation.component.css']
})
export class ViewtranscationComponent implements OnInit {
  transaction: any; // Define a property to hold the transaction data

  constructor(
    public dialogRef: MatDialogRef<ViewtranscationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Use Inject decorator to inject MAT_DIALOG_DATA
  ) {
    this.transaction = data; // Initialize transaction data
  }

  ngOnInit(): void {
    // Implement OnInit interface
  }

  navigateBack(): void {
    this.dialogRef.close(); // Close the dialog
  }

  printReceipt(): void {
    // Hide buttons and unnecessary elements before printing
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
      button.style.display = 'none';
    });
  
    // Print the receipt
    window.print();
  
    // Restore the visibility of buttons after printing
    buttons.forEach(button => {
      button.style.display = 'block';
    });
  }
  
}
