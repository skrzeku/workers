import { Component, OnInit } from '@angular/core';
import {MainService} from "../core-module/services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  logins: string = '';
  password: string = '';

  constructor(private mainservice: MainService,
              private router: Router) { }

  ngOnInit() {
  }
    login(email: string, password: any) {
    this.mainservice.login({email, password}).then(()=> this.router.navigate(['']) );
    }
}
