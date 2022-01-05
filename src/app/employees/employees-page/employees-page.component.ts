import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {

  employees?: Employee[];
  employee?: Employee;

  constructor(private employeeService: EmployeeService, private store: Store<any>,
    private router: Router) { 

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(){
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    })
  }

  public navigateToEmployeeById(id: number | undefined) {
      this.router.navigate(['app-edit-employee-page', id]);
  }
  
  public navigateToViewEmployeeById(id: number | undefined) {
    this.router.navigate(['app-employee-details-page', id]);
  }

  public deleteEmployee(id: number | undefined) {
    if(id){
      // this.employeeService.deleteEmployee(id).subscribe(data => {
      //   console.log(data);
      //   this.getEmployees();
      // })
      console.log("safety on");
    }
  }
}
