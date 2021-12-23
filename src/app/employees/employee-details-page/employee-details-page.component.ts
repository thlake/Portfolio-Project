import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.scss']
})
export class EmployeeDetailsPageComponent implements OnInit {

  id: number;
  employee: Employee;

  constructor(private employeeService: EmployeeService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log("id: ", this.id);
    console.log("test:", this.route);
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }

  public getCurrentEmployee(){
    this.employee = this.employeeService.getCurrentEmployee();
    console.log(this.employeeService.getCurrentEmployee());
  }
  

  employeeDetailsForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(''),
    email: new FormControl(''),
    ssn: new FormControl(''),
    age: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
    gender: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      postal: new FormControl('')
    })
  });


}
