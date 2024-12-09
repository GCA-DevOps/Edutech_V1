import { CoreService } from 'src/@Core/core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SuppliesService } from '../supplies.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-supplies',
  templateUrl: './add-supplies.component.html',
  styleUrls: ['./add-supplies.component.css']
})
export class AddSuppliesComponent implements OnInit {
  ParentForm!: FormGroup;
  isSubmitting:boolean = false;

  role: string[] = [
    'School Administrator',
    'School Director',
    'School Manager',
    'Principal',
    'School Accountant',
    'Chief Finance Officer',
    'School Bursar',
    'Parent',
  ];

  schools: string[] = [
    'Bahati Girls High School',
    'Cherangani High School'
  ];
  private _suppliesService: any;
  SuppliesForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private service: SuppliesService,
    private _dialogRef: MatDialogRef<AddSuppliesComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this. SuppliesForm = this._fb.group({
      businessName: [''],
      supplieridNO: [''],
      prefix: [''],
      firstname: [''],
      middlename:[''],
      lastname:[''],
      phoneNumber:[''],
     
      altPhone:[''],
      email: [''],
      address: [''],
      city:[''],
      postalCode:[''],
      country:[''],
      openingBalance:[''],
      // status:'',
  });
  }

  ngOnInit(): void {
    if (this.data) {
      this.SuppliesForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    
    // Extracting only the date part from the date_of_birth field
    const dateOfBirth = this.SuppliesForm.get('date_of_birth')?.value;
    const dateOfBirthDate = new Date(dateOfBirth);
    dateOfBirthDate.setHours(0, 0, 0, 0); // Set time to midnight
    this.SuppliesForm.get('date_of_birth')?.setValue(dateOfBirthDate.toISOString().split('T')[0]);

    console.log("1234567", this.SuppliesForm.value);
    
    if (this.SuppliesForm.valid) {
      this.isSubmitting = true
      if (this.data) {
        this.service.updateSupplies(this.data.id, this.SuppliesForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('Parent details updated!');
            this._dialogRef.close(true);
            this.isSubmitting = false
          },
          error: (err:any) => {
            console.error(err);
            this.isSubmitting = false
          },
          complete() {
            
          },
        });
      } else {
        this.service.addSupplies(this.SuppliesForm.value).subscribe(
          ((res) => {
            console.log(res)
            
          }),
          ((error) => {
            console.error(error);
            this.isSubmitting = false
          }),
          () => {
            this.snackBar.open('Supplier added successfully! ', "Close" , {duration:3600, verticalPosition:"top"});
            this._dialogRef.close(true);
            this.isSubmitting = false
          }
        );
      }
    
  }
}

}