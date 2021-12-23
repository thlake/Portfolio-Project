import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { ISomeObject, IInnerObject, IFormErrors } from '../../models';
import { validationMessages, formErrors } from '../../messages';


@Component({
  selector: 'app-add-employee-page',
  templateUrl: './add-employee-page.component.html',
  styleUrls: ['./add-employee-page.component.scss']
})
export class AddEmployeePageComponent implements OnInit {

  employee = new Employee();
  createdEmployee: Employee;
  validationMessages: ISomeObject = validationMessages;
  formErrors: IFormErrors = formErrors;


  constructor(private employeeService: EmployeeService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public validationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const formControl = form.get(key);

      if(formControl instanceof FormGroup) {
        this.validationErrors(formControl);
      } else {
        this.formErrors[key] = '';
        if(formControl && !formControl.valid && (formControl.touched || formControl.pristine)) {
          const messages = this.validationMessages[key];

          for( const errorKey in formControl.errors ) {
            if(errorKey) {
              this.formErrors[key] = messages[errorKey] + '';
            }
          }
        }
      }
    });
  }

  addEmployeeForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    ssn: new FormControl('', [Validators.required, Validators.pattern("(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}")]),
    age: new FormControl('', [Validators.required, Validators.pattern("([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])")]),
    height: new FormControl('', [Validators.required, Validators.pattern("([1-9]?[1-9]|2[0-4][0-9]|25[0-5])")]),
    weight: new FormControl('', [Validators.required, Validators.pattern("([1-9]|[1-9][0-9]|[1-9][0-9][0-9])")]),
    gender: new FormControl('', [Validators.required]),
    address: new FormGroup({
      street: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postal: new FormControl('', [Validators.required, Validators.pattern("[0-9]{5}")])
    }, Validators.required)
  });

  public createEmployee( ) {
    console.log(this.addEmployeeForm.value.firstName);

    this.employee.firstName = this.addEmployeeForm.value.firstName;
    this.employee.lastName = this.addEmployeeForm.value.lastName;
    this.employee.email = this.addEmployeeForm.value.email;
    this.employee.ssn = this.addEmployeeForm.value.ssn;
    this.employee.age = this.addEmployeeForm.value.age;
    this.employee.height = this.addEmployeeForm.value.height;
    this.employee.weight = this.addEmployeeForm.value.weight;
    this.employee.gender = this.addEmployeeForm.value.gender;
    this.employee.street = this.addEmployeeForm.value.address.street;
    this.employee.city = this.addEmployeeForm.value.address.city;
    this.employee.state = this.addEmployeeForm.value.address.state;
    this.employee.postal = this.addEmployeeForm.value.address.postal;
    
    return this.employee;
  }


  public onSubmit() {

    this.validationErrors(this.addEmployeeForm);
    this.addEmployeeForm.valueChanges.subscribe(data => {
      this.validationErrors(this.addEmployeeForm);
    });

    this.createdEmployee = this.createEmployee();
    this.addEmployeeForm.updateValueAndValidity;

    if(this.addEmployeeForm.valid) {
      this.employeeService.addEmployee(this.createdEmployee).subscribe(data =>{
        this.router.navigate(['app-employees-page']);
      }, error => console.log(error)
      );
    }
  }
}
