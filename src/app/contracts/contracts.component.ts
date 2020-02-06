import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from "@angular/material";
import {MainService} from "../core-module/services/main.service";
import {Employee} from "../core-module/models/employee";
import {AddContractComponent} from "./add-contract/add-contract.component";
import {CancelContractComponent} from "./cancel-contract/cancel-contract.component";

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.less']
})
export class ContractsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['number', 'full_name', 'department', 'contract_period', 'left_days', 'salaries', 'contract'];
  departments: string[] = ['IT', 'Księgowość', 'Administracja', 'Ochrona', 'Pracownik Produkcji'];
  dataSource: any;
  employees: Employee[];
  employee: Employee;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChildren('rows',  {read: ElementRef}) rows: QueryList<ElementRef>;


  constructor(private mainservice: MainService,
              private dialog: MatDialog,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.mainservice.getEmployees().subscribe((all)=> {
      this.employees = all;
      this.dataSource = new MatTableDataSource(all);
      this.dataSource.sort = this.sort;
    })
  }
  ngAfterViewInit(): void {
  }

  addContract(): void {
    this.dialog.open(AddContractComponent, {data: this.employee, autoFocus: false});
  }
  cancelContract(): void {
    this.dialog.open(CancelContractComponent, {data: this.employee, autoFocus: false});
  }
  selectIt(employee: Employee, event) {
    this.rows.forEach((one)=> {
     this.renderer.removeClass(one.nativeElement, 'selected_row');
    });
    const el = event.currentTarget;
    this.employee = employee;
    this.renderer.addClass(el,'selected_row');
  }



  ShowContract(event, employee: Employee):void {
    console.log(employee);
  }
}
