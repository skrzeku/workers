import { Component, OnInit } from '@angular/core';
import {MainService} from "../services/main.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.less']
})
export class NavbarTopComponent implements OnInit {
  bool: any;

  constructor(private mainservice: MainService,
              private router: Router) { }

  ngOnInit() {
    this.mainservice.authState$.subscribe((val)=> {
      this.bool = val;
    })
  }
  logout() {
    this.mainservice.logout().then(()=> this.router.navigate(['']));
  }

}
