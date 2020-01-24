import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.less']
})
export class AddContractComponent implements OnInit {

  employee: Employee;

  constructor(private dialogref: MatDialogRef<AddContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data) {
    this.employee = data;
  }

  ngOnInit() {
  }

  close(): void {
    this.dialogref.close();
  }

}
