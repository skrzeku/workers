import {RouterModule, Routes} from "@angular/router";

import {NgModule} from "@angular/core";
import {EmployeesComponent} from "./employees.component";
import {NewEmployeeComponent} from "./new-employee/new-employee.component";

const routes: Routes = [
  {path: '', component: EmployeesComponent},
  {path: 'new', component: NewEmployeeComponent, pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
