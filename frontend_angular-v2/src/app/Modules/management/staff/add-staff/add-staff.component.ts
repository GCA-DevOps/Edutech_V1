import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StaffService } from '../staff.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  staffForm: FormGroup;
  


  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _dialogRef: MatDialogRef<AddStaffComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.staffForm = this._fb.group({
      firstName: '',

      lastName: '',
      contact: '',
      email: '',
      gender: '',
      doc: ''
    });

  }
  ngOnInit(): void {
    this.staffForm.patchValue(this.data);

  }
  onFormSubmit() {
    if (this.staffForm.valid) {
      if (this.data) {
        this._staffService.updateStaff(this.data.id, this.staffForm.value).subscribe({
          next: (val: any) => {

            this._coreService.openSnackbar('Staff detail updated');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });

      } else {
        this._staffService
          .addStaff(this.staffForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackbar('Staff added successfully'
              );
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err)
            },
          });
      }
    }
  }
}
