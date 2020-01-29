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

const moment =  _moment;


export interface PeriodicElement {
  name: string;
  days?: [{
    what?: string;
  }]

}
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

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'Hydrogen', days: [{what: 'w'}]},
  {name: 'Helium',  days: [{what: 'w'}]},
  {name: 'Lithium',  days: [{what: 'w'}]},
  {name: 'Beryllium',  days: [{what: 'w'}]},
  {name: 'Boron', days: [{what: 'w'}]},
  {name: 'Carbon',  days: [{what: 'w'}]},
  {name: 'Nitrogen', days: [{what: 'w'}]},
  {name: 'Oxygen',  days: [{what: 'w'}]},
  {name: 'Fluorine',  days: [{what: 'w'}]},
  {name: 'Neon',  days: [{what: 'w'}]},
];


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
  maxDate =  moment();
  minDate = new Date(2019, 0, 1);
  @ViewChildren('rows', {read: ElementRef}) rows: QueryList<ElementRef>;




  myarray(n: number): any[] {
    return Array(n);
  }
  displayedColumns = ['name'];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'];

  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  employees: Employee[];
  dataSource: Employee[];


  //charts
  view: any[] = [400, 300];
  single: any[] = [{
    "name": "Ogółem",
    "value": 48
  },
    {
      "name": "IT",
      "value": 8
    },
    {
      "name": "Księgowość",
      "value": 10
    },
    {
      "name": "UK",
      "value": 13
    },
    {
      "name": "Italy",
      "value": 14
    },
    {
      "name": "Spain",
      "value": 8
    }];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';




  constructor(private mainservice: MainService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.pushdays();
    this.mainservice.getEmployees().subscribe((employees)=> {
      this.employees = employees;
      this.dataSource = employees;
    });
  }
  ngAfterViewInit(): void {

  }

  pushdays(): void {

    //Dodac zera dla 9 elementow!!
    for (let i = 1; i < 32; i++) {
      this.displayedColumns.push(i.toString());
    }
    this.displayedColumns.push("summary");
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    console.log(ctrlValue.year());
    console.log(ctrlValue.month());
    this.table_year = ctrlValue.year();
    this.table_month = ctrlValue.month();

    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  addAbsence(lol: any): void {
    console.log(lol);
  }


}
