import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../core-module/services/main.service";

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.less']
})
export class NewEmployeeComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogref: MatDialogRef<NewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private formbuilder: FormBuilder,
              private mainservice: MainService) { }

  ngOnInit() {
    this.BuildForm();
  }

  private BuildForm(): void {
    this.form = this.formbuilder.group({
      id: '',
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salaries: ['', Validators.required],
      sex: ['', Validators.required],
      education: ['', Validators.required],
      start_date: ['', Validators.required],
      contract_period: ['', Validators.required],
      CV: '',
      experience_all: ['', Validators.required],
      experience_here: ['', Validators.required],
      birthday: ['', Validators.required],
      pesel: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
  }

  Add_Employee(): void {
    this.form.controls['start_date'].setValue(+new Date());
    this.mainservice.addEmployee(this.form.value);
  }
  closeIt(): void {
    this.form.reset();
    this.dialogref.close();
  }

}
