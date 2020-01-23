import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StartModules} from "./start/start.module";
import {CoreModule} from "./core-module/core.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import {environment} from "../environments/environment";
import {MaterialModule} from "./material/material.module";
import {MainService} from "./core-module/services/main.service";
import {AngularFireDatabaseModule} from '@angular/fire/database'



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StartModules,
    CoreModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    AngularFireDatabaseModule,

  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
