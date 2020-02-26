import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MaterialModule} from "../material/material.module";
import {AngularFireAuthModule} from "@angular/fire/auth";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [LoginComponent]

})
export class LoginModule {




}



