import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-cancel-contract',
  templateUrl: './cancel-contract.component.html',
  styleUrls: ['./cancel-contract.component.less']
})
export class CancelContractComponent implements OnInit {
  employee: Employee;
  @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;


  constructor(private dialogref: MatDialogRef<CancelContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private _ngZone: NgZone) { }

  ngOnInit() {

  }

  close(): void {
    this.dialogref.close();
  }

}
