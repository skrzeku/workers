import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalariesComponent } from './salaries.component';
import {SalariesRoutingModule} from "./salaries-routing.module";



@NgModule({
  declarations: [SalariesComponent],
  imports: [
    CommonModule,
    SalariesRoutingModule
  ]
})
export class SalariesModule { }
