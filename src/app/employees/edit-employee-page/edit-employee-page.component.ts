import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { ISomeObject, IInnerObject, IFormErrors } from '../../models';
import { validationMessages, formErrors } from '../../messages';

@Component({
  selector: 'app-edit-employee-page',
  templateUrl: './edit-employee-page.component.html',
  styleUrls: ['./edit-employee-page.component.scss']
})

export class EditEmployeePageComponent implements OnInit {

  id: number;
  employee = new Employee();
  validationMessages: ISomeObject = validationMessages;
  formErrors: IFormErrors = formErrors;

  constructor(private employeeService: EmployeeService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(
      (data) => this.createEditForm(data),
       error => console.log(error)
    );
    this.validationErrors(this.editEmployeeForm);
  }

  public validationErrors(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      const formControl = form.get(key);

      if(formControl instanceof FormGroup) {
        this.validationErrors(formControl);
      } else {
        this.formErrors[key] = '';
        if(formControl && !formControl.valid && (formControl.touched || formControl.dirty)) {
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

  createEditForm(employee: Employee) {
      this.editEmployeeForm.patchValue({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        ssn: employee.ssn,
        age: employee.age,
        height: employee.height,
        weight: employee.weight,
        gender: employee.gender,
        address: {
          street: employee.street,
          city: employee.city,
          state: employee.state,
          postal: employee.postal
        }
      });
  }

  editEmployeeForm = new FormGroup({
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

  private updateEmployee(){
    this.employee.firstName = this.editEmployeeForm.value.firstName.trim();
    this.employee.lastName = this.editEmployeeForm.value.lastName.trim();
    this.employee.email = this.editEmployeeForm.value.email;
    this.employee.ssn = this.editEmployeeForm.value.ssn;
    this.employee.age = this.editEmployeeForm.value.age;
    this.employee.height = this.editEmployeeForm.value.height;
    this.employee.weight = this.editEmployeeForm.value.weight;
    this.employee.gender = this.editEmployeeForm.value.gender.trim();
    this.employee.street = this.editEmployeeForm.value.address.street.trim();
    this.employee.city = this.editEmployeeForm.value.address.city.trim();
    this.employee.state = this.editEmployeeForm.value.address.state.trim();
    this.employee.postal = this.editEmployeeForm.value.address.postal;
  }

  public onSubmit() {
    this.validationErrors(this.editEmployeeForm);
    this.editEmployeeForm.valueChanges.subscribe(data => {
      this.validationErrors(this.editEmployeeForm);
    });
    this.updateEmployee();
    this.editEmployeeForm.updateValueAndValidity;
    
    if(this.editEmployeeForm.valid) {
      this.employeeService.updateEmployeeById(this.id, this.employee).subscribe( data =>{
        this.router.navigate(['app-employees-page']);
      }, error => console.log(error));
    }
  }
}
