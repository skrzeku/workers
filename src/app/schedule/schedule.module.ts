import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule.component';
import {ScheduleRoutingModule} from "./schedule-routing.module";
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ActionDialogComponent } from './action-dialog/action-dialog.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";



@NgModule({
  declarations: [ScheduleComponent, ActionDialogComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  entryComponents: [ActionDialogComponent]
})
export class ScheduleModule { }
