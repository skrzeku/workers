import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../core-module/services/main.service";

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
  CV_file = '';

  constructor(private dialogref: MatDialogRef<NewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private formbuilder: FormBuilder,
              private mainservice: MainService,
              private snack: MatSnackBar) { }

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
      salaries: ['', Validators.required],
      sex: ['', Validators.required],
      education: ['', Validators.required],
      start_date: ['', Validators.required],
      contract_period: ['', Validators.required],
      experience_all: ['', Validators.required],
      experience_here: '',
      pesel: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
  }

  Add_Employee(): void {
    const date = this.form.controls['birthday'].value;
    this.form.controls['birthday'].setValue(+date);
    const start_date = this.form.controls['start_date'].value;
    this.form.controls['start_date'].setValue(+start_date);
    console.log(this.CV_file);
    this.mainservice.addEmployee(this.form.value).then(()=> {
      this.snack.open('Pomyślnie dodano pracownika!', '', {duration: 3000, panelClass: 'succes_snack'});
      this.dialogref.close();
    });
  }



  closeIt(): void {
    this.form.reset();
    this.dialogref.close();
  }
  CVFile(fileInputEvent: any): void {
    console.log(fileInputEvent.target.files[0]);
    this.CV_file = fileInputEvent.target.files[0];

  }

}
