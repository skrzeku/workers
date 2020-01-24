import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import {ContractsRoutingModule} from "./contracts-routing.module";
import {MaterialModule} from "../material/material.module";
import { AddContractComponent } from './add-contract/add-contract.component';
import { CancelContractComponent } from './cancel-contract/cancel-contract.component';



@NgModule({
  declarations: [ContractsComponent, AddContractComponent, CancelContractComponent],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    MaterialModule
  ],
  entryComponents: [AddContractComponent, CancelContractComponent]
})
export class ContractsModule { }
