import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { OtpComponent } from './components/otp/otp.component';
import { PageError404Component } from './components/page-error404/page-error404.component';
import { PageError500Component } from './components/page-error500/page-error500.component';
import { AdminModule } from '../admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { EmailMask } from 'src/@Core/helpers/emailmask';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ResetPasswordComponent } from './components/forgot-password/reset-password.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    LoginComponent,
    PasswordResetComponent,
    OtpComponent,
    PageError404Component,
    PageError500Component,
    EmailMask,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // AdminModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSnackBarModule,
    MatProgressBarModule,
  ],
})
export class AuthModule {}
