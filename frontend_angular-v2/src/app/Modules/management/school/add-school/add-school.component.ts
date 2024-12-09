import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../../../@Core/core/core.service';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css'],
})
export class AddSchoolComponent implements OnInit {
  schoolForm: FormGroup;
  currencies = ['USD', 'EUR', 'KES', 'GBP', 'INR'];
  schoolType = ['PRE-PRIMARY', 'PRIMARY', 'SECONDARY', 'COLLEGE', 'UNIVERSITY', 'OTHER'];
  countries = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'DRC', 'South Sudan'];
  countryCodes = ['KE', 'UG', 'TZ', 'RW', 'DRC', 'SS', 'ET'];

  constructor(
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private dialogRef: MatDialogRef<AddSchoolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      county: ['', Validators.required],
      country_code: ['', Validators.required],
      school_code: ['', Validators.required],
      street_address: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      website: ['', [Validators.required, Validators.pattern(/https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}/)]],
      phone_number1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phone_number2: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      date_created: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.schoolForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.schoolForm.invalid) {
      return; // Prevent submission if the form is invalid
    }
  
    const formValue = this.schoolForm.value;
    const observable = this.data
      ? this.schoolService.updateSchool(this.data.id, formValue) // Edit existing school
      : this.schoolService.addSchool(formValue); // Add new school
  
    observable.subscribe({
      next: () => {
        const message = this.data
          ? 'School details updated!'
          : 'School added successfully!';
        this.coreService.openSnackBar(message); // Show success notification
        this.dialogRef.close(true); // Close dialog and pass true
      },
      error: (err) => {
        console.error(err); // Log the error
        this.coreService.openSnackBar('An error occurred. Please try again!'); // Notify the user
      },
    });
  }
  

  onCancel() {
    this.dialogRef.close(false);
  }
}
