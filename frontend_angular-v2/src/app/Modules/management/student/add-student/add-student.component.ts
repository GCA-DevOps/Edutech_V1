import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/app/core/core.service';
import { StudentService } from '../student.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { FeecategoryService } from '../../feecategory/service/feecategory.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  studentGender: string[] = ['Male', 'Female'];
  grade: string[] = [];
  loading?: boolean;
  upiNumber: string = '';
  upiNumbers: string[] = [];
  healthStatuses: string[] = ['Healthy', 'Sick', 'Recovering'];
  imageUrl: string | null = null;
  selectedImg: File[] = [];
  parentIds: string[] = [];
  parentId: string = '';
  filteredParentIds: string[] = [];
  isParentIdDropdownOpen: boolean = false;
  selectedOption: string = '';
  upiErrorMessage: string | null = null;
  fileErrorMessage: string | null = null;
  res: any;
  feeCategories: any;
  grades: any;
  structures: any[] = []
  action: string = "add";
  
  

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private _studentService: StudentService,
    private feecategoryService: FeecategoryService,
    private snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _coreService: CoreService
  ) {
    this.studentForm = this._fb.group({
      id: [''],
      admNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      middleName: '',
      lastName: ['', [Validators.required]],
      studentGender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      dateOfAdmission: ['', [Validators.required]],
      stream: '',
      grade: ['', [Validators.required]],
      parentID: ['', [Validators.required]],
      upiNumber: '',
      healthStatus: '',
      urls: [''],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.action = this.data.data.action
      this.studentForm.patchValue(this.data.data);
      if (this.data.urls) {
        this.imageUrl = this.data.urls[0];
      }
    }

    this.fetchAndExtractGrades();

    this.fetchParentIds();
    this.studentForm.get('upiNumber')?.valueChanges.subscribe((upiNumber) => {
      if (upiNumber) {
        this.populateFormWithUPI(upiNumber);
      }
    });
  }

  createRequestBody(): any {
    const formValues = this.studentForm.value;
    const requestBody = {
      admNumber: formValues.admNumber || '',
      firstName: formValues.firstName || '',
      middleName: formValues.middleName || '',
      lastName: formValues.lastName || '',
      studentGender: formValues.studentGender || '',
      dob: formValues.dob ? moment(formValues.dob).format('YYYY-MM-DD') : '',
      upiNumber: formValues.upiNumber || '',
      stream: formValues.stream || '',
      parentID: formValues.parentID || '', // Assuming parentID is numeric
      fee_struct_id: formValues.grade.id || ''
    };
  
    return requestBody;
  }
  

  public populateFormWithUPI(upiNumber: string): void {
    const mockStudentData: { [key: string]: any } = {
      '12345678': {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        admNumber: 'ADM1234',
        studentGender: 'Male',
        grade: 'Grade 2',
        dob: '2005-05-15',
        dateOfAdmission: '2022-01-10',
        parentID: 'Parent1',
        upiNumber: '12345678',
        healthStatus: 'Healthy',
      },
      '87654321': {
        firstName: 'Jane',
        middleName: 'Anne',
        lastName: 'Doe',
        admNumber: 'ADM5678',
        studentGender: 'Female',
        grade: 'Grade 4',
        dob: '2007-09-20',
        dateOfAdmission: '2023-02-15',
        parentID: 'Parent2',
        upiNumber: '87654321',
        healthStatus: 'Recovering',
      },
    };

    const studentData = mockStudentData[upiNumber];
    if (studentData) {
      this.studentForm.patchValue(studentData);
    } else {
      console.error('No data found for UPI number:', upiNumber);
      this.upiErrorMessage = 'No student found with this UPI number.';
    }
  }

  onFormSubmit() {
    const data = this.createRequestBody()
    this._studentService.add(data, this.action, this.studentForm.get('id')?.value).subscribe({
      next: (res) => {
        this.loading = true
        this.snackBar.open('Student added successfully!', 'Close', { duration: 3000 });
        this._dialogRef.close();
      },
      error: (err) => {
        this.loading =false
      }
    })
  }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }

  public onOptionChange(option: string): void {
    this.selectedOption = option;
    console.log('Option changed to:', option);
  }

  public onCancel(): void {
    this._dialogRef.close();
  }

  public fetchParentIds(): void {
    this.http.get<any>('http://192.168.1.105:9030/api/v1/parents/parents/').subscribe({
      next: (response) => {
        this.parentIds = response.results.map((parent: any) => parent.parentIdno);
        this.filteredParentIds = [...this.parentIds];
      },
      error: (error) => {
        console.error('Failed to fetch parent IDs:', error);
      },
    });
  }

  openParentIdDropdown(): void {
    this.isParentIdDropdownOpen = true; // Open the dropdown
    this.filteredParentIds = [...this.parentIds]; // Reset the dropdown options
    console.log('Parent ID dropdown opened');
  }
  

  filterParentIds(event: any): void {
    const searchTerm = event.target.value.toLowerCase();
    this.filteredParentIds = this.parentIds.filter((id) =>
      id.toLowerCase().includes(searchTerm)
    );
  }

  selectParentId(id: string): void {
    this.parentId = id; // Update the selected parent ID
    this.studentForm.get('parentID')?.setValue(id); // Update the form control
    this.filteredParentIds = []; // Clear the dropdown options
    this.isParentIdDropdownOpen = false; // Close the dropdown
    console.log(`Parent ID selected: ${id}`);
  }

  fetchAndExtractGrades() {
    this.loading = true;
  
    this.feecategoryService.getFeecategoryList().subscribe({
      next: (res: any) => {
        this.loading = false;
  
        // Directly extract grades and remove duplicates
        this.feeCategories = res.entity;
        // this.grades = [
        //   ...new Set(
        //     this.feeCategories.map((category: any) => category.grade)
        //   ),
        // ];
        this.structures = this.feeCategories
        console.log("grades are here", this.grades)
      },
      error: (err) => {
        this.loading = false;
        console.error('Error fetching fee categories:', err);
      },
    });
  }
  
  

  
}
