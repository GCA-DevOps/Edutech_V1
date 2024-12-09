import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-student-fee',
  templateUrl: './view-student-fee.component.html',
  styleUrls: ['./view-student-fee.component.css']
})
export class ViewStudentFeeComponent {

  isLoading: boolean = false;  // Track loading state
  feeStructure: any = null;    // Initialize feeStructure to null
  studentId: any// Make sure studentId is a string or null
  studentName: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      studentName: any; studentId: string 
    },
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // Ensure studentId is received correctly from the dialog data
    this.studentId = this.data.studentId;
    this.studentName = this.data.studentName;
    console.log('Student ID:', this.studentId);
    console.log('Student name:', this.studentName);

    if (this.studentId) {
      this.getFeeByStudentId();
    } else {
      console.error('No student ID provided.');
    }
  }

  // Method to fetch student fee structure
  getFeeByStudentId(): void {
    this.isLoading = true; // Set loading state to true before making the request
    
    // Call the service to fetch the fee structure
    this.studentService.getStudentFee(this.studentId).subscribe({
      next: (res: any) => {
        console.log("Fee Structure:", res); // Log response to console for debugging

        // Assuming 'res.entity' contains the actual fee structure
        if (res && res.entity) {
          this.feeStructure = res.entity;  // Assign fee structure to the component
        } else {
          console.error('No fee structure data found in response');
        }

        this.isLoading = false;  // Stop loading once data is received
      },
      error: (err) => {
        console.error('Error fetching fee categories:', err);
        this.isLoading = false;  // Stop loading in case of an error
      }
    });
  }
}
