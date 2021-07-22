import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8089/api/v1/employees';
  addEmployee: any;

  constructor(private http: HttpClient) { }

  getEmployee(id: number): Observable< Employee> {
    return this.http.get< Employee>(`${this.baseUrl}/${id}`);
  }
  getEmployees(): Observable< Employee[]> {
    return this.http.get< Employee[]>(`${this.baseUrl}/all`);
  }

  createEmployee(employee: any): Observable< Employee> {
    return this.http.post< Employee>(`${this.baseUrl}/addEmployee`, employee);
  }
  updateEmployee(employee: any): Observable< any> {
    return this.http.put(`${this.baseUrl}/update`, employee);
  }

  // updateEmployee(): Observable<Object> {
    // return this.http.put(`${this.baseUrl}`);
  // }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }
  

  getEmployeesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}