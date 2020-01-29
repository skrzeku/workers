import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import {ContractsRoutingModule} from "./contracts-routing.module";
import {MaterialModule} from "../material/material.module";
import { AddContractComponent } from './add-contract/add-contract.component';
import { CancelContractComponent } from './cancel-contract/cancel-contract.component';
import { NewContractComponent } from './new-contract/new-contract.component';
import {RouterModule} from "@angular/router";
import { BottomComponent } from '../core-module/bottom/bottom.component';
import {CoreModule} from "../core-module/core.module";




@NgModule({
  declarations: [ContractsComponent, AddContractComponent, CancelContractComponent, NewContractComponent],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    MaterialModule,
    RouterModule,
    CoreModule
  ],
  entryComponents: [AddContractComponent, CancelContractComponent, BottomComponent]    //dialogs and bottoms
})
export class ContractsModule { }
