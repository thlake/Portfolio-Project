import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { employeeReducer } from "./state/employees.reducer";
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { AddEmployeePageComponent } from './add-employee-page/add-employee-page.component';
import { EditEmployeePageComponent } from './edit-employee-page/edit-employee-page.component';
import { EmployeeDetailsPageComponent } from './employee-details-page/employee-details-page.component';


@NgModule({
  declarations: [
    EmployeesPageComponent,
    AddEmployeePageComponent,
    EditEmployeePageComponent,
    EmployeeDetailsPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("employees", employeeReducer)
  ]
})
export class EmployeesModule { }
