import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees.component';
import {EmployeesRoutingModule} from "./employees-routing.module";
import {MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule} from "@angular/material";
import {MaterialModule} from "../material/material.module";
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BottomComponent} from "../core-module/bottom/bottom.component";
import {CoreModule} from "../core-module/core.module";



@NgModule({
  declarations: [EmployeesComponent, NewEmployeeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule,
    CoreModule
  ],
  entryComponents: [BottomComponent]
})
export class EmployeesModule { }
