import { Injectable } from '@angular/core';
import {Employee} from "../models/employee";
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Api_url = '/employees';

  constructor(private db: AngularFireDatabase) { }

  getEmployees(): Observable<Employee[]> {
    return this.db.list<Employee>(this.Api_url).snapshotChanges()
      .pipe(map(response => response.map(car => this.assignKey(car))));
  }

  private assignKey(employee) {
    return {...employee.payload.val(), key: employee.key };
  }



  addEmployee(employee: Employee) {
    return this.db.list<Employee>(this.Api_url).push(employee);
  }
  deleteEmployee(key: string) {
    return this.db.object(`${this.Api_url}/${key}`).remove();
  }
  editEmployee(key: string, employee: Employee) {
    return this.db.object<Employee>(`${this.Api_url}/${key}`).update(employee);
  }
}
