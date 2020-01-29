import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContractsComponent} from "./contracts.component";
import {NewContractComponent} from "./new-contract/new-contract.component";

const routes: Routes = [
  {path: '', component: ContractsComponent},
  {path: 'new', component: NewContractComponent, pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
