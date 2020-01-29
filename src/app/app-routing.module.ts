import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StartComponent} from "./start/start.component";
import {ScheduleComponent} from "./schedule/schedule.component";


const routes: Routes = [
  {path: '', component: StartComponent},
  {path: 'employees', loadChildren: () => import("./employees/employees.module").then(m => m.EmployeesModule) },
  {path: 'salaries', loadChildren: () => import("./salaries/salaries.module").then(m => m.SalariesModule) },
  {path: 'schedule', pathMatch: 'full', loadChildren: () => import("./schedule/schedule.module").then(m => m.ScheduleModule) },
  {path: 'absences', pathMatch: 'full', loadChildren: () => import("./absences/absences.module").then(m => m.AbsencesModule) },
  {path: 'contracts',  loadChildren: ()=> import("./contracts/contracts.module").then(s => s.ContractsModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
