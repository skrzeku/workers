import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../core-module/services/main.service";
import {Router} from "@angular/router";
import {Employee} from "../../core-module/models/employee";


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
export class NewEmployeeComponent implements OnInit, OnDestroy {

  form: FormGroup;
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  educations = ['Podstawowe', 'Gimnazjalne', 'Zawodowe', 'Średnie', 'Wyższe'];
  sex = ['Kobieta', 'Mężczyzna'];
  CV_file: File;
  myarray: schedule[] = [];
  employee: Employee;

  constructor(private formbuilder: FormBuilder,
              private mainservice: MainService,
              private snack: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.BuildForm();
    this.LoadEmployee();
  }
  ngOnDestroy(): void {
    this.mainservice.shareEmployee(null);
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
      absences: 0,
      schedule: [],
      pesel: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ''
    })
  }

  Add_Employee(): void {
    const date = this.form.controls['birthday'].value;
    this.form.controls['birthday'].setValue(+date);
    //const start_date = this.form.controls['start_date'].value;
    //this.form.controls['start_date'].setValue(+start_date);
    this.mainservice.addEmployee(this.form.value).then(()=> {
      this.snack.open('Pomyślnie dodano pracownika!', '', {duration: 3000, panelClass: 'succes_snack'});
    });
  }
  Edit_Employee(employee: Employee): void {
    const date = this.form.controls['birthday'].value;
    this.form.controls['birthday'].setValue(+date);
     this.mainservice.editEmployee(employee.key, this.form.value).then(()=> {
       this.router.navigate(['employees']).then(()=> {
         this.snack.open('Pomyślnie edytowano pracownika!', '', {duration: 3000, panelClass: 'succes_snack'});
       });
     });
  }
  LoadEmployee(): void {
    if (this.mainservice.EmplyeeSubject.value) {
      this.mainservice.EmplyeeSubject.subscribe((employee)=> {
        this.employee = employee;
        this.form.patchValue(employee);
      })
    }
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


}
