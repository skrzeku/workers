import { Component, OnInit } from '@angular/core';
import {Employee} from "../../core-module/models/employee";

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.less']
})
export class ActionDialogComponent implements OnInit {
  employee: Employee[];

  constructor() { }

  ngOnInit() {
  }

}
