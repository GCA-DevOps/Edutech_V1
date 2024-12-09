import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AuthService } from '../../../../../@Core/Authservice/auth.service';
import { NotificationService } from 'src/@Core/helpers/NotificationService/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  loading = false;
  submitted = false;
  formData!: FormGroup;
  error = '';
  required: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private notificationAPI: NotificationService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formData = this.formBuilder.group({
      emailAddress: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.formData && this.formData.valid) {
      this.loading = true;
      this.authService.forgotPassword(this.formData.value).subscribe(
        (res: { statusCode: number; message: any }) => {
          if (res && res.statusCode === 200 && res.message) {
            this.notificationAPI.alertSuccess(res.message);
            // Handle successful password reset, e.g., redirect
          } else {
            this.notificationAPI.alertWarning(
              'Password reset failed. Please try again.'
            );
          }
          this.loading = false;
        },
        (error: any) => {
          this.notificationAPI.alertWarning(
            'An error occurred while resetting password. Please try again later.'
          );
          this.loading = false;
        }
      );
    } else {
      this.notificationAPI.alertWarning('Invalid Form!');
    }
  }
}
