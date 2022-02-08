import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from './employee';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = environment.API_URL + "/api/v1/";
  private secondURL = environment.API_URL + "/api/v1/employee"
  currentEmployee: Employee;
  
  constructor(private httpClient: HttpClient) { }

  getCurrentEmployee( ) {
    return this.currentEmployee;
  }

  getEmployees(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL + "employees"}`);
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL + "employees/" + id}`);
  }

  updateEmployeeById(id: number, employee: Employee): Observable<Object> {
    return this.httpClient.put(`${this.secondURL}/${id}`, employee);
  }

  addEmployee(employee: Employee): Observable<Object> {
    return this.httpClient.post(`${this.baseURL + "employees"}`, employee);
  }

  deleteEmployee(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL + "employees/" + id}`);
  }
}
