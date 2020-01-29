import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {MaterialModule} from "../material/material.module";
import {MatButtonModule} from "@angular/material";
import {NgxChartsModule} from "@swimlane/ngx-charts";




@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NgxChartsModule
  ],
  exports: [StartComponent]
})
export class StartModules { }
