import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OtpComponent } from './components/otp/otp.component';
import { ResetPasswordComponent } from './components/forgot-password/reset-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { FeeCategoryComponent } from '../management/feecategory/feecategory.component';

const routes: Routes = [
  { path: 'otp', component: OtpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ResetPasswordComponent },
  { path: 'passwordreset', component: PasswordResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
