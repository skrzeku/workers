import { Component, OnInit } from '@angular/core';
import {Employee} from "../../core-module/models/employee";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {BottomComponent} from "../../core-module/bottom/bottom.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../core-module/services/main.service";
import {AngularFireDatabase} from "@angular/fire/database";
export interface schedule {
  month: number,
  year: number,
  day: number,
  what: string
}


@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.less'],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class NewContractComponent implements OnInit {
  employee: Employee;  //from service, need to subscribe
  editcontract: boolean = false;
  myarray: schedule[] = [];
  form: FormGroup;
  private Api_url = '/employees';


  constructor(private _bottomSheet: MatBottomSheet,
              private formbuilder: FormBuilder,
              private _bottomSheetRef: MatBottomSheetRef<BottomComponent>,
              private mainservice: MainService,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.BuildForm();
    this.mainservice.getEmployees().subscribe((emps)=> {
      this.employee = emps[0];
      console.log(this.employee);
    });


  }
  BuildForm(): void {
    this.form = this.formbuilder.group({
    salaries: ['', Validators.required],
      schedule: [[]],
      start_date: '',
      contract_period: '',
      termination: ''
    })
  }

  showform(): void {
    this.editcontract = !this.editcontract;
  }
  openBottomSheet(values?): void {  //add form values as parametr
    this._bottomSheet.open(BottomComponent, {autoFocus: false});
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }
  editEmployee(key: string, employee: Employee, what?: any, start?: any, salary?: any, termination?: any, period?: any ) {
    return this.db.object<Employee>(`${this.Api_url}/${key}`).update(employee); //{schedule: what, start_date: start, salaries: salary, termination: termination, contract_period: period}

  }


      //this void is ready
  checkdates(): void {
    const emploeestartdate = this.form.controls['start_date'].value;
    const period = +this.form.controls['contract_period'].value;


    const lastday = new Date(emploeestartdate.getFullYear(), emploeestartdate.getMonth() + period, emploeestartdate.getDate());

    for (let month = emploeestartdate; month < lastday; month.setMonth(month.getMonth() + 1)) {
      const daysinMonth = this.daysInMonth(month.getMonth(), month.getFullYear());
      for(let day = 1; day <= daysinMonth; day++) {
        const dynamicdate = new Date(month.getFullYear(), month.getMonth(), day);
        let whatstring = 'w';
        if (dynamicdate.getDay() === 6 || dynamicdate.getDay() === 0) {
          whatstring = '';
        }
        this.myarray.push({
          day: day,
          month: month.getMonth(),
          what: whatstring,
          year: month.getFullYear()
        });
      }
    }

    this.form.controls['schedule'].setValue(this.myarray);
    this.editEmployee(this.employee.key, this.form.value);


  }

}
