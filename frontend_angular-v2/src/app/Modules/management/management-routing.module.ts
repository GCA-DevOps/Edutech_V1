import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFeeCategoryComponent } from './feecategory/view-fee-category/view-fee-category.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: ViewFeeCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
