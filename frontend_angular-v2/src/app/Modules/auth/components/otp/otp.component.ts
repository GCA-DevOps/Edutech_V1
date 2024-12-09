import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { AuthService } from 'src/@Core/Authservice/auth.service';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit, AfterViewInit {
  otpForm!: FormGroup;
  email: any;
  loading: boolean = false;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: TokenStorageService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private renderer: Renderer2
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const user = this.storageService.getUser();
    if (user) {
      this.email = user.email;
    }
    // Ensure form is initialized before patching the value
    if (this.otpForm && this.otpForm.get('email')) {
      this.otpForm.get('email')?.patchValue(this.email);
    }
    this.requestOtp(this.email);
  }

  ngAfterViewInit(): void {
    const otpFields = document.querySelectorAll('.otp-field');
    otpFields.forEach((field, index) => {
      this.renderer.listen(field, 'input', (e) => {
        const input = e.target as HTMLInputElement;
        if (input.value.length === 1 && index < otpFields.length - 1) {
          (otpFields[index + 1] as HTMLElement).focus();
        }
      });
    });
  }

  initForm() {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.maxLength(1)]],
      otp2: ['', [Validators.required, Validators.maxLength(1)]],
      otp3: ['', [Validators.required, Validators.maxLength(1)]],
      otp4: ['', [Validators.required, Validators.maxLength(1)]],
      otp5: ['', [Validators.required, Validators.maxLength(1)]],
      otp6: ['', [Validators.required, Validators.maxLength(1)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  verifyOtp(): void {
    const otp = this.generateOtp();
    const body = {
      otp: otp,
      email: this.otpForm.get('email')?.value,
    };

    // Check if all OTP fields are filled before making the API call
    if (this.otpForm.valid && otp.length === 6) {
      console.log('Verifying OTP...', this.otpForm.valid);

      this.authService.verifyOtp(body).subscribe({
        next: (result: any) => {
          console.log("otppppy",this.authService.verifyOtp(body));
          
          if (result.status === 200 && result.message === 'OTP validated') {

            console.log("kichwaaaa", result.status && result.message)

            this.showSnackBar(result.message || 'OTP has been successfully verified', 'success');
            if (result.entity && result.entity.access_token) {
              this.storageService.saveToken(result.entity.access_token);
            }
            this.route.navigate(['/admin/home']);
          } else if (result.status === 400 && result.message === 'Invalid OTP') {
            console.log("errorrrr", result.status && result.message)
            this.showSnackBar('Invalid OTP. Please try again.', 'error');
          } else {
            console.log("error is..",result.entity && result.entity.access_token)
            // Handle other unexpected responses
            this.showSnackBar('An unexpected error occurred. Please try again.', 'error');
          }
        },
        error: (error) => {

          console.error('Error during OTP verification:', error);
          this.showSnackBar(error.statusText || 'Failed to verify OTP. Please try again.', 'error');
        },
      });
    } else {
      this.showSnackBar('Please complete all OTP fields before submitting.', 'error');
    }
  }

  requestOtp(email: any): void {
    console.log('Requesting OTP for email:', email); // Log the email being sent for OTP request

    const body = { email: email };
    this.authService.requestOtp(body).subscribe({
      next: (result: any) => {
        if (result.status === 200) {
          this.showSnackBar(result.message, 'success');
        } else {
          this.showSnackBar(result.message, 'error');
        }
      },
      error: (error) => {
        this.showSnackBar(error.statusText || 'Failed to request OTP.', 'error');
        console.error(error);
      },
    });
  }

  generateOtp(): string {
    const otp1 = this.otpForm.get('otp1')?.value || '';
    const otp2 = this.otpForm.get('otp2')?.value || '';
    const otp3 = this.otpForm.get('otp3')?.value || '';
    const otp4 = this.otpForm.get('otp4')?.value || '';
    const otp5 = this.otpForm.get('otp5')?.value || '';
    const otp6 = this.otpForm.get('otp6')?.value || '';
    return otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
  }

  
  showSnackBar(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }
}
