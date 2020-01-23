import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {Employee} from "../core-module/models/employee";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";
import {MainService} from "../core-module/services/main.service";







@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
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
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji']



  constructor(private dialog: MatDialog,
              private mainservice: MainService) { }

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
    this.dialog.open(NewEmployeeComponent);
  }
  detailsEmployee(employe: Employee): void {
    this.employee = employe;
    this.showright = true;
  }
  closeInfo(): void {
    this.showright = false;
  }

}
