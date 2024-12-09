import { CoreService } from 'src/@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ExpensesService } from '../expenses.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.css']
})
export class AddExpensesComponent implements OnInit {
  ExpensesForm: FormGroup;
  isSubmitting: boolean = false;
  fb: any;

  constructor(
    private _fb: FormBuilder,
    private service: ExpensesService,
    private _dialogRef: MatDialogRef<AddExpensesComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.ExpensesForm = this._fb.group({
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      expensetypes: this._fb.group({
        name: ['', Validators.required],
        description: ['']
      })
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.ExpensesForm.patchValue(this.data);
    }
    this.ExpensesForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],  // Example form controls with validation
      expensetypes: this.fb.group({
        name: ['', Validators.required]
      })
    });
  }

  onFormSubmit() {
    console.log("Form Value", this.ExpensesForm.value);
    if (this.ExpensesForm.valid) {
      this.isSubmitting = true;
      if (this.data) {
        this.service.updateExpenses(this.data.id, this.ExpensesForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Expenses details updated!');
            this._dialogRef.close(true);
            this.isSubmitting = false;
          },
          error: (err: any) => {
            console.error(err);
            this.isSubmitting = false;
          },
        });
      } else {
        this.service.addExpenses(this.ExpensesForm.value).subscribe({
          next: (res) => {
            console.log(res);
            this.snackBar.open('Expense added successfully!', 'Close', {
              duration: 3600,
              verticalPosition: 'top',
            });
            this._dialogRef.close(true);
            this.isSubmitting = false;
          },
          error: (error) => {
            console.error(error);
            this.isSubmitting = false;
          },
        });
      }
    }
  }
}
