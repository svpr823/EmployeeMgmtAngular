import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http:HttpClient) { }

  url = "http://localhost:8080/v2/employees";
  
  headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic dXNlcjp1c2Vy`
    });

  requestOptions = { headers: this.headers };

  getAllEmployees(){
    return this.http.get(this.url, this.requestOptions);
    }

  deleteEmployeeById(employeeId){
      return this.http.delete(this.url + "/" + employeeId, this.requestOptions)
    }

  createEmployee(requestBody){
    return this.http.post(this.url, requestBody, this.requestOptions)
  }

  updateEmployee(requestBody, employeeId){
    return this.http.put(this.url + "/" + employeeId, requestBody, this.requestOptions)
  }

}
