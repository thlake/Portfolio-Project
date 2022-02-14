import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {

  employees?: Employee[];
  employee?: Employee;
  closeModal: string;
 
  constructor(private employeeService: EmployeeService, private store: Store<any>,
    private router: Router, private modalService: NgbModal) { 

  }

  openModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
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

  //disabled until authorization and authentication features are completed
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
