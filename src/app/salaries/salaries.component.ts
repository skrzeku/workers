import {Component, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren} from '@angular/core';
import {MainService} from "../core-module/services/main.service";
import {Employee} from "../core-module/models/employee";
import {MatPaginator, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.less']
})
export class SalariesComponent implements OnInit {

  displayedColumns = ['id', 'full_name', 'department', 'salaries', 'end_contract', 'payroll'];
  departments = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  employees: Employee[];
  dataSource: any;
  dep_emps = [];
  salaries_arr = [];
  avarage: number;
  employee: Employee;

    @ViewChildren(MatPaginator) paginator: QueryList<MatPaginator>;
    @ViewChildren('rows', {read: ElementRef}) rows: QueryList<ElementRef>;

  constructor(private mainservice: MainService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.mainservice.getEmployees().subscribe((empees)=> {
      this.employees = empees;
      this.dataSource = new MatTableDataSource(empees);

      this.departments.forEach((one, index)=> {
        this.dep_emps[index] = empees.filter((emp) => {
          return emp.department.includes(one);
        });
        this.salaries_arr[index] = this.dep_emps[index].map((amp)=> {
          return amp.salaries;
        }).reduce((a, b) => a + b, 0) / this.dep_emps[index].length;

      });
      this.avarage = this.employees.map((one)=> one.salaries).reduce((a, b)=> { return a + b})/ this.employees.length;
    });
  }

  Checkthis(): void {
    console.log(this.dep_emps[0].length);
   console.log(this.salaries_arr.reduce((a,b)=> a + b, 0)/ this.salaries_arr.length);
  }
  selectIt(what: Employee, event) {
    this.rows.forEach((one)=> {
      this.renderer.removeClass(one.nativeElement, 'selected_row');
    });
    this.employee = what;
    const el = event.currentTarget;
    this.renderer.addClass(el,'selected_row');
  }


}
