import { Injectable } from '@angular/core';
import {Employee} from "../models/employee";
import {AngularFireDatabase} from '@angular/fire/database';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {Summary} from "../models/summary";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private Api_url = '/employees';
  private summ_url = '/summary';
  ScheduleArray = new BehaviorSubject(null);
  EmplyeeSubject = new BehaviorSubject<Employee>(null);

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
  addSummary(summary: Summary) {
    return this.db.list<Summary>(this.summ_url).push(summary);
  }
  editSummary(key: string, summary: Summary) {
    return this.db.object<Summary>(`${this.summ_url}/${key}`).update(summary);
  }
  getSummaries(): Observable<Summary[]> {
    return this.db.list<Summary>(this.summ_url).snapshotChanges()
      .pipe(map(response => response.map(summary => this.assignKey(summary))));
  }


  deleteEmployee(key: string) {
    return this.db.object(`${this.Api_url}/${key}`).remove();
  }
  editEmployee(key: string, employee: Employee) {
    return this.db.object<Employee>(`${this.Api_url}/${key}`).update(employee);
  }
  sharescheduleArray(what: any): void {
    this.ScheduleArray.next({what});
    console.log(this.ScheduleArray);
  }
  GetSubject(): Observable<any> {
    return this.ScheduleArray.asObservable();
  }
  shareEmployee(employee: Employee): void {
    this.EmplyeeSubject.next(employee);
  }
}
