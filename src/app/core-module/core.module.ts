import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {Router, RouterModule} from "@angular/router";
import {Employee} from "./models/employee";
import {MainService} from "./services/main.service";
import { FooterComponent } from './footer/footer.component';
import {BottomComponent} from "./bottom/bottom.component";
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [NavbarTopComponent, SidebarComponent, FooterComponent, BottomComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [NavbarTopComponent, SidebarComponent, FooterComponent, BottomComponent],
  providers: [MainService]
})
export class CoreModule { }
