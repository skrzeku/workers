import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsComponent } from './contracts.component';
import {ContractsRoutingModule} from "./contracts-routing.module";
import {MaterialModule} from "../material/material.module";
import { AddContractComponent } from './add-contract/add-contract.component';
import { CancelContractComponent } from './cancel-contract/cancel-contract.component';
import { AddInsideComponent } from './add-contract/add-inside/add-inside.component';



@NgModule({
  declarations: [ContractsComponent, AddContractComponent, CancelContractComponent, AddInsideComponent],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    MaterialModule
  ],
  entryComponents: [AddContractComponent, CancelContractComponent, AddInsideComponent]
})
export class ContractsModule { }
