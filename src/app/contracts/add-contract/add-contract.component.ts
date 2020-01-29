import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {Employee} from "../../core-module/models/employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-contract',
  templateUrl: './add-contract.component.html',
  styleUrls: ['./add-contract.component.less']
})
export class AddContractComponent implements OnInit {

  employee: Employee;

  constructor(private dialogref: MatDialogRef<AddContractComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private router: Router) {
    this.employee = data;
  }

  ngOnInit() {
  }

  GotoNewContract(employee: Employee, edit?: boolean): void {
    this.router.navigate(['contracts/new']).then(()=> {
      this.dialogref.close();
    });
    console.log(edit);
  }



  close(): void {
    this.dialogref.close();
  }

}
