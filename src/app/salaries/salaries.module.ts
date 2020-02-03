import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalariesComponent } from './salaries.component';
import {SalariesRoutingModule} from "./salaries-routing.module";
import {MaterialModule} from "../material/material.module";
import { PayrollComponent } from './payroll/payroll.component';



@NgModule({
  declarations: [SalariesComponent, PayrollComponent],
  imports: [
    CommonModule,
    SalariesRoutingModule,
    MaterialModule
  ]
})
export class SalariesModule { }
