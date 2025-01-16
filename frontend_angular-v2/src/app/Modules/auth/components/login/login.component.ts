import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert
import { AuthService } from 'src/@Core/Authservice/auth.service';
import { TokenStorageService } from 'src/@Core/Authservice/token-storage.service';
import { NotificationService } from 'src/@Core/helpers/NotificationService/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMsg: string | undefined;
  loading = false;
  passwordVisible = false;
  passwordFieldType = 'password';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log('Submitting login form with data:', this.loginForm.value);
      
      this.authService.login(this.loginForm.value).subscribe({
        next: (result: any) => {
          console.log('Login response received:', result);
          if (result.status === 200) {
            console.log('Login successful, saving user data:', result.entity);
            this.tokenStorageService.saveUser(result.entity);
            const savedUser = this.tokenStorageService.getUser();
            console.log('Saved user data:', savedUser);
            
            // Check if we have the necessary data
            if (!savedUser) {
              console.error('No user data was saved');
              this.notificationService.showError('Login failed: No user data received');
              return;
            }

            // Prompt user to change password
            Swal.fire({
              title: 'Login Successful',
              text: 'Welcome back!',
              icon: 'success',
              confirmButtonText: 'Continue'
            }).then(() => {
              console.log('Navigating to dashboard...');
              this.router.navigate(['/admin/home']).then(
                (navigated) => console.log('Navigation result:', navigated),
                (error) => console.error('Navigation error:', error)
              );
            });
          } else {
            console.error('Unexpected response status:', result.status);
            this.notificationService.showError('Login failed. Please try again.');
          }
        },
        error: (error: any) => {
          console.error('Login error:', error);
          this.loading = false;
          
          let errorMessage = 'Login failed. Please try again.';
          if (error.status === 401) {
            errorMessage = 'Invalid username or password.';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to the server. Please check your connection.';
          }
          
          this.notificationService.showError(errorMessage);
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.notificationService.showError('Please fill in all required fields.');
    }
  }
  showSnackBar(message: string, type: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, 
      horizontalPosition: 'right', 
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['snackbar-success'] : ['snackbar-error'],
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
    this.passwordFieldType = this.passwordVisible ? 'text' : 'password';
  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }
}
