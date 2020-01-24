import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AbsencesComponent} from "./absences.component";

const routes: Routes = [
  {path: '', component: AbsencesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsencesRoutingModule { }
