import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatBottomSheet, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs/operators";
import {BottomComponent} from "../../core-module/bottom/bottom.component";

@Component({
  selector: 'app-cancel-contract',
  templateUrl: './cancel-contract.component.html',
  styleUrls: ['./cancel-contract.component.less']
})
export class CancelContractComponent implements OnInit {
  employee: Employee;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  constructor(private dialogref: MatDialogRef<CancelContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private _ngZone: NgZone,
              private _bottomSheet: MatBottomSheet) { }

  ngOnInit() {

  }

  close(): void {
    this.dialogref.close();
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomComponent);
  }

}
