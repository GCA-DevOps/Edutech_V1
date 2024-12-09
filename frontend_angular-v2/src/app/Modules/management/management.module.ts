import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRoutingModule } from './management-routing.module';
import { StaffComponent } from './staff/staff.component';
import { StudentComponent } from './student/student.component';
import { FeeCategoryComponent } from './feecategory/feecategory.component';
import { SytemUsersComponent } from './sytem-users/sytem-users.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AddSystemUserComponent } from './sytem-users/add-system-user/add-system-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RolesManagementComponent } from './roles-management/roles-management.component';
import { RolesMaintenanceComponent } from './roles-management/roles-maintenance/roles-maintenance.component';
import { RolesLookupsComponent } from './roles-management/roles-lookups/roles-lookups.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RolesComponent } from './sytem-users/roles/roles.component';
import { AddRolesComponent } from './sytem-users/roles/add-roles/add-roles.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { AddStaffComponent } from './staff/add-staff/add-staff.component';
import { SchoolComponent } from './school/school.component';
import { AddSchoolComponent } from './school/add-school/add-school.component';
import { ParentComponent } from './parent/parent.component';
import { AddParentComponent } from './parent/add-parent/add-parent.component';
import { DeleteConfirmationComponent } from './student/delete-confirmation/delete-confirmation.component';
import { FormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { ViewFeeCategoryComponent } from './feecategory/view-fee-category/view-fee-category.component';
import { UpdateFeeCategoryComponent } from './feecategory/update-fee-category/update-fee-category.component';
import { ViewStudentFeeComponent } from './student/view-student-fee/view-student-fee.component';






@NgModule({
  declarations: [
    StaffComponent,
    StudentComponent,
    FeeCategoryComponent,
    SytemUsersComponent,
    AddSystemUserComponent,
    RolesManagementComponent,
    RolesMaintenanceComponent,
    RolesLookupsComponent,
    SytemUsersComponent,
    RolesComponent,
    AddRolesComponent,
    AddStudentComponent,
    AddStaffComponent,
    SchoolComponent,
    AddSchoolComponent,
    ParentComponent,
    AddParentComponent,
    DeleteConfirmationComponent,
    ViewFeeCategoryComponent,
    UpdateFeeCategoryComponent,
    ViewStudentFeeComponent,
  

  
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    FormsModule,
    // MatCardModule,
   
  





 
  ]
})
export class ManagementModule {}
