import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";

@Component({
  selector: 'app-cancel-contract',
  templateUrl: './cancel-contract.component.html',
  styleUrls: ['./cancel-contract.component.less']
})
export class CancelContractComponent implements OnInit {
  employee: Employee;

  constructor(private dialogref: MatDialogRef<CancelContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogref.close();
  }

}
