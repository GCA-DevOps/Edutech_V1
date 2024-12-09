import { CoreService } from '../../../../../core/core.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.css'],
})
export class AddRolesComponent implements OnInit {
  RolesForm!: FormGroup;

  role: string[] = [
    'School Administrator',
    'School Director',
    'School Manager',
    'Principal',
    'School Accountant',
    'Chief Finance Officer',
    'School Bursar',
  ];

  constructor(
    private _fb: FormBuilder,
    private _addRolesService: RolesService,
    private _dialogueRef: MatDialogRef<AddRolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.RolesForm = this._fb.group({
      name: [0, Validators.required],
      description: ['', Validators.required],
      addFee: [false],
      viewFee: [false],
      updateFee: [false],
      viewStudents: [false],
      addStudents: [false],
      addRoles: [false],
    });
  }

  ngOnInit(): void {
    console.log('Data:', this.data);
    if (this.data) {
      this.RolesForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.RolesForm.valid) {
      if (this.data) {
        this._addRolesService
          .updateRoles(this.data.id, this.RolesForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('System user details updated!');
              this._dialogueRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._addRolesService.addRoles(this.RolesForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('System user added successfully! ☺');
            this._dialogueRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}