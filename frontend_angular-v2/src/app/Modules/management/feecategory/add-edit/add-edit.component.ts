import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeecategoryService } from '../service/feecategory.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeeCategoryComponent } from '../feecategory.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  termForm!: FormGroup
  grade: any

  years: any [] = [2024, 2025, 2026]
  grades: string [] = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9"];
  termArray: string[ ]  = ["Term 1", "Term 2", "Term 3"]
  loading: boolean = false

  constructor(
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private service: FeecategoryService,
    private dialogRef: MatDialogRef<FeeCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.initForm()
    this.subForm()
  }

  initForm() {
    this.termForm = this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      term: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
    })

    this.form = this.fb.group({
      title: ['', [Validators.required]],
      year: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      components: this.fb.array([this.termForm]),
  })
  }

  subForm(): FormGroup {
    return this.fb.group({
      description: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      term: ['', [Validators.required]],
      deadline: ['', [Validators.required]]
    })
  }

  // Submit form
  submit() {
    this.loading = true;

    console.log("data is", this.form.value)
    this.service.create(this.form.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.dialogRef.close()

        this.snackbar.open(res.message, 'Ok', {
          duration: 3000,
          panelClass: ['snack-success']
        })
      },
      error: (err) => {
        this.loading = false;

        this.snackbar.open(err.error, 'Ok', {duration: 3000, panelClass: ['snack-error']})
      },
      complete: () => {}
    })
  }

  cancel() {
    this.dialogRef.close();
  }

  get subForms(): FormArray {
    return this.form.get('components') as FormArray;
  }

  addForm() {
    this.subForms.push(this.subForm());
  }

  removeForm(index: number) {
    if (this.subForms.length > 1) {
      this.subForms.removeAt(index)
    }
  }

  selectYear(year: any) {
  }

  selectGrade(grade: any) {}

  filterGrades(event: any) {}

  filterYears(event: any) {}

  openGrades() {}

  openYears() {}
}
