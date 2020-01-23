import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import {MaterialModule} from "../material/material.module";
import {MatButtonModule} from "@angular/material";




@NgModule({
  declarations: [StartComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [StartComponent]
})
export class StartModules { }
