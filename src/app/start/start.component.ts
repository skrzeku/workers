import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from "../core-module/models/employee";
import {MainService} from "../core-module/services/main.service";
import {FormControl} from "@angular/forms";
import * as _moment from "moment";
import {Moment} from "moment";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDatepicker} from "@angular/material";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {Summary} from "../core-module/models/summary";
import {Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
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
export interface tableObject {
  name: string,
  value: number
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class StartComponent implements OnInit, OnDestroy {
  employees: Employee[];

  workersdatas: tableObject[];
  educationdatas: tableObject[];
  salariescost: tableObject[];
  avarageAbs: any[];
  allmonthSalaries: number;
  avaragesalaries: any[];
  bottomAbsences: tableObject[];
  months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Pażdziernik', 'Listopad', 'Grudzień'];
  workersview: any[];
  educationview: any[] = [550, 200];
  gradient: boolean = false;
  table_year = 2020;
  table_month = 1;
  workerscolors = {
    domain: ['#111111', '#2DBB54']
  };

  // options
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Data';
  showYAxisLabel = true;
  yAxisLabel = 'Liczba Dni';
  timeline: boolean = false;
  xAxis: boolean = true;
  subscribtion: Subscription;
  yAxis: boolean = true;
  showLegend: boolean = true;
  date = new FormControl(moment());
  maxDate =  moment();
  minDate = new Date(2019, 0, 1);
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  educations = ['Podstawowe', 'Gimnazjalne', 'Zawodowe', 'Średnie', 'Wyższe'];
  mosteducation: string;
  summaries: Summary[];
  momentemployees: number;
  avgsalary: number;
  avgabsence: number;




  constructor(private mainservice: MainService) { }

  ngOnInit() {
            this.mainservice.getSummaries().subscribe((summs)=> {
              this.summaries = summs;
              this.momentemployees= summs[moment().month()].employees;
              this.avarageAbsences(summs);
            });
        this.subscribtion =this.mainservice.getEmployees()
          .subscribe((emps)=> {
          this.employees = emps;
          this.workersdatas = [];
          this.educationdatas = [];
          this.checkavaragesalaries(emps);
          this.countMonthAbsences(emps, 1);
          this.countMonthSalaries(emps, 1);
          this.departments.forEach((one)=> {
            const dep = emps.filter(on => on.department.includes(one) && this.FilterEmployees(on)).length;
            this.workersdatas.push({name: one, value: dep});
          });

          this.educations.forEach((one)=> {
            const edu = emps.filter(on => on.education.includes(one)).length;
            this.educationdatas.push({name: one, value: edu});
          });

          const mynumb =this.educationdatas.map(on => on.value);
          this.mosteducation = this.educationdatas.filter(one => one.value === Math.max(...mynumb))[0].name;
        });
  }
ngOnDestroy(): void {
    //this.subscribtion.unsubscribe();
}

  FilterEmployees(employee: Employee, month = moment().month()) {
      return employee.schedule.some(one => !one.what.includes("-") && one.month === month);
  }

  avarageAbsences(summaries: Summary[]): void {
    this.avarageAbs = [{
      name: 'Absencje',
      series: []
    }];
    let workers = [];
    let absences = [];
    summaries.forEach((onemonth)=> {
      this.avarageAbs[0].series.push({name: (onemonth.month + 1).toString() + '/2020', value: (onemonth.absences/onemonth.employees) || 0});
      workers.push(onemonth.employees);
      absences.push(onemonth.absences);
    });
    this.avgabsence = Math.round((absences.reduce((a,b)=> a+b, 0)/ workers.reduce((a,b)=>a+b,0) * 10))/ 10;
  }

  checkavaragesalaries(employees: Employee[]): void {
    this.avaragesalaries = [{
      name: 'Wynagrodzenie',
      series: []
    }];
    let money = [];
    let workers = [];
    this.summaries.forEach((onemonth)=> {
      const employeesInMonth = employees.filter((one)=> this.FilterEmployees(one, onemonth.month));
      const salaryamount = Math.round(employeesInMonth.map(on=> on.salaries).reduce((a,b)=> a + b,0));
      console.log(salaryamount);
      this.avaragesalaries[0].series.push({name: (onemonth.month + 1).toString() + '/2020', value: salaryamount/employeesInMonth.length || 0});
     money.push(salaryamount);
     workers.push(employeesInMonth.length);
    });
    this.avgsalary = Math.round(money.reduce((a,b)=> a+b, 0) / workers.reduce((a,b)=>a+b,0));
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.table_year = ctrlValue.year();
    this.table_month = ctrlValue.month();
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  countMonthAbsences(employees: Employee[], month: number): void {
    this.bottomAbsences = [];
    const employeesInMonth = employees.filter((one)=> this.FilterEmployees(one, month));
    this.departments.forEach((department)=> {
      let departmentarray = [];
      const workerfromdepartment = employeesInMonth.filter(one => one.department.includes(department));
      workerfromdepartment.forEach((oneEmp)=> {
        const daysPerOnedepartWorker = oneEmp.schedule.filter((oneday)=> oneday.month === month && (oneday.what.includes('U') || oneday.what.includes('Z'))).length;
        departmentarray.push(daysPerOnedepartWorker);
      });
      this.bottomAbsences.push({name: department, value: departmentarray.reduce((a,b)=>a+b,0)});
      });
  }
  countMonthSalaries(employees: Employee[], month: number): void {
    this.salariescost = [];
    const employeesInMonth = employees.filter((one)=> this.FilterEmployees(one, month));
    this.departments.forEach((department)=> {
     const cost = employeesInMonth.filter((one)=> one.department.includes(department))
        .map(one => one.salaries)
        .reduce((a,b)=>a+b,0);
     this.salariescost.push({name: department, value: cost});
     this.allmonthSalaries = this.salariescost.map(one => one.value).reduce((a,b)=> a+b,0);

    });
  }
}
