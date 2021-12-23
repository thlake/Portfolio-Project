import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeePageComponent } from './employees/add-employee-page/add-employee-page.component';
import { EditEmployeePageComponent } from './employees/edit-employee-page/edit-employee-page.component';
import { EmployeesPageComponent } from './employees/employees-page/employees-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EmployeeDetailsPageComponent } from './employees/employee-details-page/employee-details-page.component';


const routes: Routes = [
  {path: '', redirectTo: 'app-home-page', pathMatch:'full'},
  {path: 'app-home-page', component: HomePageComponent},
  {path: 'app-add-employee-page', component: AddEmployeePageComponent},
  {path: 'app-edit-employee-page/:id', component: EditEmployeePageComponent},
  {path: 'app-employees-page', component: EmployeesPageComponent},
  {path: 'app-employee-details-page/:id', component: EmployeeDetailsPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
