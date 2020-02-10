import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
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
  @ViewChildren('rows', {read: ElementRef}) rows: QueryList<ElementRef>;
  private Api_url = '/employees';
  schedulearray: schedule[] = [];
  arrayofemployees: Employee[] = [];
  daysbefore: number;




  myarray(n: number): any[] {
    return Array(n);
  }

  displayedColumns = ['name'];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'];

  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  employees: Employee[];
  dataSource: Employee[];
  subscription: any;


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
    });
  }

  ngAfterViewInit(): void {

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
    console.log(ctrlValue.year());
    console.log(ctrlValue.month());
    this.table_year = ctrlValue.year();
    this.table_month = ctrlValue.month();
    this.date.setValue(ctrlValue);
    this.getdaysbefore();
    this.filldateArray();
    this.pushdays();
    datepicker.close();
  }
  addAbsence(element: any, employee: Employee): void {
    if (!this.arrayofemployees.includes(employee)) {
      this.arrayofemployees.push(employee);
    }

    this.schedulearray = employee.schedule;
    const ind = employee.schedule.findIndex((obj)=> obj.month === this.table_month && obj.day === element.target.cellIndex);
    employee.schedule[ind].what = 'U';
  }
  editEmployee(key: string, what?: any, absences?: number ) {
    return this.db.object<Employee>(`${this.Api_url}/${key}`).update({schedule: what, absences: absences}); //{schedule: what, start_date: start, salaries: salary, termination: termination, contract_period: period}
  }

  applychanges(): void {
    this.arrayofemployees.forEach((one)=> {
      const length = one.schedule.filter((one) => one.what === 'U').length;
      this.editEmployee(one.key, one.schedule, length);
    })
  }
  testSubject(): void {

  }

}
