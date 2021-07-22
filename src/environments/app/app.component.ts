import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  
  public employees: Employee[] = [];
  public addEmployee?: Employee;
  public editEmployee?: Employee;
  public deleteEmployee!: Employee;
  title: any;
  data: any;
  
  ngOnInit(): void {
    this.getEmployees();
  }
  constructor(private employeeService: EmployeeService) { }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response : Employee[]) =>{
        this.employees = response;
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void {
    if(addForm.valid){
      this.data = addForm.value
      }
      console.log(addForm.value); 
       addForm.value.Email =  addForm.value + "@" + addForm.value + "." +addForm.value;
    console.log(addForm.value);
    addForm.value.phone = "+" + addForm.value.countryCode +  addForm.value.phone;
    console.log(addForm.value);
    document.getElementById('add-employee-form')?.click(); 
    this.employeeService.createEmployee(addForm.value).subscribe(
      (response) =>{
        this.getEmployees();
        
      },
      (error: HttpErrorResponse) =>{
        alert("added Sucessfully")
      }
    
    );
  

  }

  public onUpdateEmployee(employee: Employee): void {
    document.getElementById('update-employee-form')?.click();
    
    this.employeeService.updateEmployee(employee).subscribe(
      (response) =>{
        alert("updated sucessfully")
        console.log("Error" + response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    document.getElementById('update-employee-form')?.click();
  }
  
  public onDeleteEmployee(employeeId: number): void {
    console.log(employeeId)

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) =>{
        alert("Deleted sucessfully")

        console.log("Error" + response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
    document.getElementById('delete-employee-form')?.click();
  }

  
 

   public onModalClick(employee: any, mode: string){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      this.addEmployee = employee;
      button.setAttribute('data-target', '#addEmployeeModel')
    }
    if(mode === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModel')
    }
    if(mode === 'update'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModel')
    }
    
   
    container?.appendChild(button);
    button.click();
  }

  

}

function reloadPage() {
  throw new Error('Function not implemented.');
}
