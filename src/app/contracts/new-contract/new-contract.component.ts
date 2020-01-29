import { Component, OnInit } from '@angular/core';
import {Employee} from "../../core-module/models/employee";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetRef} from "@angular/material";
import {BottomComponent} from "../../core-module/bottom/bottom.component";

@Component({
  selector: 'app-new-contract',
  templateUrl: './new-contract.component.html',
  styleUrls: ['./new-contract.component.less'],
  providers: [
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
  ],
})
export class NewContractComponent implements OnInit {
  employee: Employee;  //from service, need to subscribe
  editcontract: boolean = false;

  constructor(private _bottomSheet: MatBottomSheet,
              private _bottomSheetRef: MatBottomSheetRef<BottomComponent>) { }

  ngOnInit() {
  }

  showform(): void {
    this.editcontract = true;
  }
  openBottomSheet(values?): void {  //add form values as parametr
    this._bottomSheet.open(BottomComponent, {autoFocus: false});
  }
  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
