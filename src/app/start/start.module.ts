import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {MaterialModule} from "../material/material.module";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule,
    ReactiveFormsModule
  ],
  exports: [StartComponent]
})
export class StartModules { }
