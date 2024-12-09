

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FeecategoryService } from '../feecategory/service/feecategory.service';
import { AdminServiceService } from '../../admin/service/admin-service.service';
import { NotificationService } from 'src/@Core/helpers/NotificationService/notification.service';

@Component({
  selector: 'app-pay-fee',
  templateUrl: './pay-fee.component.html',
  styleUrls: ['./pay-fee.component.css']
})
export class PayFeeComponent implements OnInit {



  feeCategories = [
    { value: 'category1', viewValue: 'Category 1' },];

    feeCat: any;
    students = [
      { id: 'S123', name: 'John Doe' },];


  showForm: boolean = false;






onPay() {
throw new Error('Method not implemented.');
}
  pay_fee_form: FormGroup;
  search_student_form: FormGroup;
  name = "Jane Doe"
  apiResponse: any;

  

  constructor(
    private _fb: FormBuilder, 
    private _FeecategoryService: FeecategoryService, 
    private _service: AdminServiceService, 
    private notificationService: NotificationService,
    private _dialogRef: MatDialogRef<PayFeeComponent>
  ) {

    this.pay_fee_form = this._fb.group({
      student_name: ['', Validators.required],
      adm_no: ['', Validators.required],
      feecategory: [''],
      amount: [''],
      id: [''],
    });

    this.search_student_form = this._fb.group({
      // Define your form controls here:
      search_param: ['', Validators.required]
    });




  }

  ngOnInit(): void {
    // Initialization code
  }

  onSearch() {
    try {
      let val = this.search_student_form.value;
      this._service.searchStudent(val.search_param).subscribe({
        next: (response: any) => {
          this.notificationService.alertSuccess(response.name);
          this.apiResponse = response;
          this.showForm = true
          this.populateForm();

          // Load fee

          this._service.loadfeecategories().subscribe({
            next: (results: any) => {
              this.feeCat = results
            },
            error: (err: any) => {
              this.notificationService.alertWarning("An error occured fetching fee categories");
            }
          });

        },
        error: (err: any) => {
          this.notificationService.alertWarning("No record found for provided Search Parameter");
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
      this.notificationService.alertWarning(error);
    }
  }
  

  onFormSubmit() {
    if (this.pay_fee_form.valid) {
    let formdata = this.pay_fee_form.value;

    let payload = {
      "feecategory": formdata.feecategory,
      "school": 1,
      "studentId": formdata.id,
      "amountPaid": parseFloat(formdata.amount),
      "payment_mode": "Cash",
    }
      
      this._service.postfeepayment(payload).subscribe({
        next: (response: any) => {
          console.log(response);
          
          this.notificationService.alertSuccess(response.message);
        },
        error: (err: any) => {
          this.notificationService.alertWarning(err);
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.pay_fee_form);
    }
  }


  populateForm(): void {
    // Populate form fields with API response data
    this.pay_fee_form.patchValue({
      student_name: this.apiResponse.name,
      adm_no: this.apiResponse.admNumber,
      id: this.apiResponse.id
      // Populate other form controls as needed
    });
  }

  // Helper method to mark all fields as touched
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
}
