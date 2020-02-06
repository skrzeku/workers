import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../core-module/services/main.service";
import {Router} from "@angular/router";


export interface schedule {
  month: number,
  year: number,
  day: number,
  what: string
}

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.less']
})
export class NewEmployeeComponent implements OnInit {

  form: FormGroup;
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  educations = ['Podstawowe', 'Gimnazjalne', 'Zawodowe', 'Średnie', 'Wyższe'];
  sex = ['Kobieta', 'Mężczyzna'];
  CV_file: File;
  myarray: schedule[] = [];

  constructor(private formbuilder: FormBuilder,
              private mainservice: MainService,
              private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.BuildForm();
  }

  private BuildForm(): void {
    this.form = this.formbuilder.group({
      id: '',
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      CV: '',
      birthday: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salaries: '',
      sex: ['', Validators.required],
      education: ['', Validators.required],
      start_date: '',
      contract_period: '',
      experience_all: ['', Validators.required],
      experience_here: '',
      schedule: [{
        month: 1,
        year: 2002,
        day: 1,
        what: 'w'
      }],
      pesel: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ''
    })
  }

  Add_Employee(): void {
    const date = this.form.controls['birthday'].value;
    this.form.controls['birthday'].setValue(+date);
    const start_date = this.form.controls['start_date'].value;
    this.form.controls['start_date'].setValue(+start_date);
    this.mainservice.addEmployee(this.form.value).then(()=> {
      this.snack.open('Pomyślnie dodano pracownika!', '', {duration: 3000, panelClass: 'succes_snack'});
    });
  }



  closeIt(): void {
    this.form.reset();
    this.router.navigate(['employees']);

  }
  CVFile(fileInputEvent: any): void {
    console.log(fileInputEvent.target.files[0]);
    this.CV_file = fileInputEvent.target.files[0];

  }
  mainImgChange(file: any): void {
    console.log(file.target.files[0]);
  }
   daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
  }
  checkdates(): void {
    console.log(new Date().getDay());
    const date = new Date(2020, 2, 1);
    console.log(this.daysInMonth(1, 2020));


    const startmonth = date.getMonth();
    const startyear = date.getUTCFullYear();
    const startday = date.getDate();

    const lastday = new Date(startyear, startmonth + 4, startday);

    for (let month = date; month < lastday; month.setMonth(month.getMonth() + 1)) {
      const startofmonth = month;
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
      console.log(this.myarray);
    }


  }

}
