import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";
import {AddInsideComponent} from "./add-inside/add-inside.component";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.less']
})
export class AddContractComponent implements OnInit {

  employee: Employee;

  constructor(private dialogref: MatDialogRef<AddContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private dialog: MatDialog) {
    this.employee = data;
  }

  ngOnInit() {
  }


  OpenEditform(): void {
    this.dialog.open(AddInsideComponent, {data: this.employee});
  }
  OpenNewForm(): void {
    this.dialog.open(AddInsideComponent, {data: this.employee});
  }

  close(): void {
    this.dialogref.close();
  }

}
