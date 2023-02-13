import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import { RestapiService } from './restapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private employeeService:RestapiService){

  }

  title = 'EmployeeMgmtAppFrontEnd';

  employees=null;

  formHeader="Add Employee";
  FirstName="";
  LastName="";
  EmailId="";
  CreatedBy="";
  UpdatedBy="";
  EmployeeId=null;
  showForm=false;

  ngOnInit(): void{
    this.getAllEmployees();
  }

  getAllEmployees(){
    return this.employeeService.getAllEmployees().subscribe(
      (data) => {this.employees = data},
      (error) => {console.log(error)}
    );
  }

  deleteEmployee(employeeId){
    this.employeeService.deleteEmployeeById(employeeId).subscribe(
      (res) => {this.getAllEmployees()}
    );
  }

  openForm(data=null){
    this.showForm=true;
    this.clearForm();
    if(data){
      this.FirstName = data.FirstName;
      this.LastName = data.LastName;
      this.EmailId = data.EmailAddress;
      this.CreatedBy = data.CreatedBy;
      this.UpdatedBy = data.UpdatedBy;
      this.EmployeeId = data.Id;
      this.formHeader = "Edit Employee";
    }
    else{
      this.EmployeeId = null;
      this.formHeader = "Add Employee";
    }
  }

  closeForm(){
    this.showForm=false;
    this.clearForm();
  }

  saveEmployee(){
    this.showForm=false;

    let requestBody = {
      FirstName: this.FirstName,
      LastName: this.LastName,
      EmailAddress: this.EmailId,
      CreatedBy: this.CreatedBy,
      UpdatedBy: this.UpdatedBy
    }

    if(this.EmployeeId){
      requestBody['Id'] = this.EmployeeId
      this.employeeService.updateEmployee(requestBody, this.EmployeeId).subscribe(
        (res) => {this.getAllEmployees()}
      );
    }
    else{
      this.employeeService.createEmployee(requestBody).subscribe(
        (res) => {this.getAllEmployees()}
      );
    }

  }

  clearForm(){
    this.FirstName = null;
    this.LastName = null;
    this.EmailId = null;
    this.CreatedBy = null;
    this.UpdatedBy = null;
  }
  
}
