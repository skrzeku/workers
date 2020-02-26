import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker, MatDialog} from "@angular/material";
import {FormControl} from "@angular/forms";
import {MainService} from "../core-module/services/main.service";
import {Employee} from "../core-module/models/employee";
import {ActionDialogComponent} from "./action-dialog/action-dialog.component";
import {AngularFireDatabase} from "@angular/fire/database";
import {schedule} from "../core-module/models/schedule";
import {toArray} from "rxjs/operators";
import {Summary} from "../core-module/models/summary";

const moment =  _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};




@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.less'],
  providers: [
  // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  // application's root module. We provide it at the component level here, due to limitations of
  // our example generation script.
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],
})




export class ScheduleComponent implements OnInit, AfterViewInit {
  date = new FormControl(moment());
  table_year = 2020;
  table_month = 0;
  maxDate =  new Date(2020, 3, 1);
  minDate = new Date(2019, 0, 1);
  @ViewChild('lol', {static: true}) lol: ElementRef;
  @ViewChildren('rows', {read: ElementRef}) rows: QueryList<ElementRef>;
  private Api_url = '/employees';
  private sum_ulr = '/summary';
  schedulearray: schedule[] = [];
  arrayofemployees: Employee[] = [];
  daysbefore: number;
  filtredEmployees: Employee[];
  arrayofsummaries: Summary[] = [];




  myarray(n: number): any[] {
    return Array(n);
  }

  displayedColumns = ['name'];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'];

  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  employees: Employee[];
  dataSource: Employee[];
  subscription: any;
  absencesselect = 'U';
  math = Math;


  //charts
  view: any[] = [400, 300];




  constructor(private mainservice: MainService,
              private dialog: MatDialog,
              private db: AngularFireDatabase) { }

  ngOnInit() {
   console.log(this.daysInMonth(this.table_month, this.table_year));
   this.getdaysbefore();
    this.pushdays();
   this.filldateArray();
    this.mainservice.getEmployees().subscribe((employees)=> {
      this.employees = employees;
      this.dataSource = employees;
     this.filtredEmployees = this.FilterEmployees(employees, this.table_month);
    });
  }

  ngAfterViewInit(): void {
    this.mainservice.getSummaries().subscribe((all)=> {
      this.arrayofsummaries = all;
      console.log(all);
    })
  }
  FilterEmployees(employees: Employee[], months: number) {
    return employees.filter((one) => {
      return one.schedule.some(one => !one.what.includes("-") && one.month === months);
    });
  }

  filldateArray(): any[] {
    return Array(this.daysInMonth(this.table_month + 1, this.table_year) + 1);
  }

  getdaysbefore(): void {
    let arr = [];
    for (let month = 0; month < this.table_month; month++ ) {
      arr.push(this.daysInMonth(month + 1, this.table_year));
    }
    if (arr.length < 1) {
      this.daysbefore = 0;
    }
    else {
      this.daysbefore = arr.reduce((a, b)=> a + b);
    }
  }

  pushdays(): void {
    this.displayedColumns = ['name'];

    //Dodac zera dla 9 elementow!!
    for (let i = 1; i <= this.daysInMonth(this.table_month + 1, this.table_year); i++) {
      this.displayedColumns.push(i.toString());
    }
    this.displayedColumns.push("summary");
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

  }
  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.table_year = ctrlValue.year();
    this.table_month = ctrlValue.month();
    this.date.setValue(ctrlValue);
    this.getdaysbefore();
    this.filldateArray();
    this.pushdays();
    this.filtredEmployees = this.FilterEmployees(this.employees, this.table_month);
    datepicker.close();
  }
  addAbsence(element: any, employee: Employee): void {
    if (!this.arrayofemployees.includes(employee)) {
      this.arrayofemployees.push(employee);
    }

    this.schedulearray = employee.schedule;
    const ind = employee.schedule.findIndex((obj)=> obj.month === this.table_month && obj.day === element.target.cellIndex);
    employee.schedule[ind].what = this.absencesselect;
  }
  editEmployee(key: string, what?: any, absences?: any ) {
    return this.db.object<Employee>(`${this.Api_url}/${key}`).update({schedule: what, absences: absences}); //{schedule: what, start_date: start, salaries: salary, termination: termination, contract_period: period}
  }
  editSummary(key: string, month?: any, absences?: any ) {
    return this.db.object<Summary>(`${this.sum_ulr}/${key}`).update({month: month, absences: absences}); //{schedule: what, start_date: start, salaries: salary, termination: termination, contract_period: period}
  }

  applychanges(): void {
    this.arrayofemployees.forEach((one)=> {
      const length = one.schedule.filter((one) => one.what === 'U' || one.what === 'Z').length;
      this.editEmployee(one.key, one.schedule, length);
    })
  }
  testSubject(): void {
    this.arrayofsummaries.forEach((one)=> {
      let montharray = [];
      this.employees.forEach((on)=> {
        const length = on.schedule.filter((ones)=> (ones.what.includes('U') || ones.what.includes('Z')) && ones.month === one.month).length;
        montharray.push(length);
      });
      const count = montharray.reduce((a, b) => a + b,0);
      this.editSummary(one.key, one.month, count);
    });
  }
  dosometning(e: any): void {
    console.log(e);
  }

}
