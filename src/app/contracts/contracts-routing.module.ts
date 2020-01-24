import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContractsComponent} from "./contracts.component";

const routes: Routes = [
  {path: '', component: ContractsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
