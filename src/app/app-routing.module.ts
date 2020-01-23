import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from "./start/start.component";


const routes: Routes = [
  //{path: '', loadChildren: () => import("./start/start.module").then(m => m.StartModule) }
  {path: '', component: StartComponent},
  {path: 'employees', loadChildren: () => import("./employees/employees.module").then(m => m.EmployeesModule) },
  {path: 'salaries', loadChildren: () => import("./salaries/salaries.module").then(m => m.SalariesModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
