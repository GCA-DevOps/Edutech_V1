import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-add-parent',
  templateUrl: './add-parent.component.html',
  styleUrls: ['./add-parent.component.css']
})
export class AddParentComponent implements OnInit {

  parentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _parentService: ParentService,
    private _dialogRef: MatDialogRef<AddParentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.parentForm = this._fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      parentIdno: '',
    });
  }

  ngOnInit(): void {
    this.parentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.parentForm.valid) {
      const formData = this.parentForm.value;

      if (this.data) {
        this._parentService.updateParent(this.data.id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackbar('Parent details updated successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {
        this._parentService.addParent(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackbar('Parent added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  onCancel(): void {
    // Close the dialog without doing anything
    this._dialogRef.close(false);
  }
}
