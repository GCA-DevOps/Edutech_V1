import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert
import { AuthService } from '../../../../../@Core/Authservice/auth.service'; // Update the path as needed

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  passwordResetForm: FormGroup;
  passwordVisible = false;
  passwordFieldType = 'password';
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]] // Updated minimum length to 4 characters
    });
  }

  ngOnInit(): void {}

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  onSubmit(): void {
    console.log('Submitting form...');

    if (this.passwordResetForm.invalid) {
      console.log('Form is invalid. Aborting submission.');
      return;
    }

    const { email, password } = this.passwordResetForm.value;
    console.log('Form is valid. Proceeding with submission...');

    this.isLoading = true;
    this.authService.resetPassword({ email, password }).subscribe(
      response => {
        this.isLoading = false;
        console.log('Password reset successful', response);
        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful!',
          text: 'Your password has been reset successfully.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/auth/otp']);
        });
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.error.message || 'An error occurred. Please try again.';
        console.error('Password reset error', error);
      }
    );
  }
}
