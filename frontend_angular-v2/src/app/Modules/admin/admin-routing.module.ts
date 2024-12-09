import { RolesComponent } from './../management/sytem-users/roles/roles.component';
import { ViewReportsComponent } from './components/pages/Report/view-reports/view-reports.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './components/Dashboard/dashboard-main/dashboard-main.component';
import { HomeComponent } from './components/pages/home/home/home.component';
import { SettingsComponent } from './components/pages/settings/settings/settings.component';
import { ReportComponent } from './components/pages/Report/report/report.component';


// import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';

import { DonationsComponent } from './components/pages/Account/income/donations/donations.component';
import { GraphOneComponent } from './components/pages/home/home/graph-one/graph-one.component';
import { FeeCollectionsComponent } from './components/pages/Account/income/fee-collections/fee-collections.component';

import { ChartsOfAccountsComponent } from './components/pages/Report/charts-of-accounts/charts-of-accounts.component';

import { StaffComponent } from '../management/staff/staff.component';
import { StudentComponent } from '../management/student/student.component';
import { FeeCategoryComponent } from '../management/feecategory/feecategory.component';
// import { SuppliesComponent } from './components/pages/Account/expenses/supplies/supplies.component';



import { ViewtranscationComponent } from './components/pages/Account/income/viewtranscation/viewtranscation.component';
import { SytemUsersComponent } from '../management/sytem-users/sytem-users.component';
import { IncomeTypesComponent } from './components/pages/Account/income/income-types/income-types.component';
import { ExpensesComponent } from './components/pages/Account/expenses/expenses.component';
import { SchoolComponent} from '../management/school/school.component';

import { FeeStatementComponent } from './components/pages/Account/fee-statement/fee-statement.component';
import { ParentComponent } from '../management/parent/parent.component';
import { DeleteConfirmationComponent } from '../management/student/delete-confirmation/delete-confirmation.component';

import { SuppliesComponent } from './components/pages/Account/supplies/supplies.component';


const routes: Routes = [
  {
    path: '',component: DashboardMainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent,       },
      { path: 'settings', component: SettingsComponent },
      { path: 'reports', component: ReportComponent },
      
    
      { path: 'supplies', component: SuppliesComponent },
     
      { path: 'donations', component: DonationsComponent },
      { path: 'feeCollections', component: FeeCollectionsComponent },
      { path: 'graphonecomponent', component: GraphOneComponent},
      { path: 'feecategory', component: FeeCategoryComponent },
      
     
      
      { path: 'trasactions', component: ViewtranscationComponent },
      // { path: 'supplies', component: SuppliesComponent},

      { path: 'student', component: StudentComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'roles', component: RolesComponent },

      { path: 'ChartsOfAccounts', component: ChartsOfAccountsComponent },
      { path: 'viewreports', component: ViewReportsComponent },
     
      { path: 'SystemUsers', component: SytemUsersComponent },
      { path: 'school', component: SchoolComponent },
      { path: 'Incometypes', component: IncomeTypesComponent },
      { path: 'FeeStatement', component: FeeStatementComponent },
      { path: 'parent', component: ParentComponent},
      { path: 'delete-confirmation', component: DeleteConfirmationComponent},
      {
        path: 'managementmodule',
        loadChildren: () =>
          import('../management/management.module').then(
            (m) => m.ManagementModule
          ),
      },
      


      // expenses
      {path: 'expenses', component: ExpensesComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
