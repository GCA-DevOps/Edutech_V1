import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SytemUsersComponent } from './Modules/management/sytem-users/sytem-users.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'src/@Core/Authservice/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {path:'' , redirectTo:'/auth/login', pathMatch:'full'},
 
      {
        path:'admin',
        loadChildren: () => import('./Modules/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./Modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'managementmodule',
        loadChildren: () =>
          import('./Modules/management/management.module').then(
            (m) => m.ManagementModule
          ),
        canActivate: [AuthGuard]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

@NgModule({
  declarations: [],
  imports: [CommonModule, AppRoutingModule]
})
export class ParentModule {}
