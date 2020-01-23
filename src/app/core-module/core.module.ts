import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {Router, RouterModule} from "@angular/router";
import {Employee} from "./models/employee";
import {MainService} from "./services/main.service";



@NgModule({
  declarations: [NavbarTopComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavbarTopComponent, SidebarComponent],
  providers: [MainService]
})
export class CoreModule { }
