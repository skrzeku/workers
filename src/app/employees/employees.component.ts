import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatBottomSheet, MatDialog, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import {Employee} from "../core-module/models/employee";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";
import {MainService} from "../core-module/services/main.service";
import {Router} from "@angular/router";
import {BottomComponent} from "../core-module/bottom/bottom.component";







@Component({
  selector: 'app-employees',
  templateUrl: "./employees.component.html",
  styleUrls: ['./employees.component.less']
})

export class EmployeesComponent implements OnInit, AfterViewInit {
  employees: Employee[];
  employee: Employee;
  dataSource: any;
  filters_shown = false;

  displayedColumns: string[] = ['id', 'last_name', 'department', 'education', 'salaries'];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showright = false;
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];



  //pie


  // options



  constructor(private dialog: MatDialog,
              private mainservice: MainService,
              private router: Router,
              private _bottomSheet: MatBottomSheet,
              private snack: MatSnackBar) {
  }

  ngOnInit() {

    this.mainservice.getEmployees().subscribe((empees)=> {
      this.employees = empees;
      this.dataSource = new MatTableDataSource(empees);
      this.dataSource.sort = this.sort;

    });


  }
  ngAfterViewInit(): void {

  }


  AddEmployer(): void {
    this.router.navigate(['employees/new']);

  }
  detailsEmployee(employe: Employee): void {
    this.employee = employe;
    this.showright = true;
  }
  closeInfo(): void {
    this.showright = false;
  }
  RemoveEmploee() {
    if (!this.employee.contract_end) {
      this.snack.open('Nie można usunąć pracownika, ponieważ posiada ważną umowę', '', {panelClass: 'error_snack'});
    }
    else {
      this._bottomSheet.open(BottomComponent, {autoFocus: false});
    }

  }
  gotoEdit(employee: Employee): void {
    this.router.navigate(['employees/new']).then(()=> {
    this.mainservice.shareEmployee(employee);
    console.log(employee);
    });
  }




}
