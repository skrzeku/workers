import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-inside',
  templateUrl: './add-inside.component.html',
  styleUrls: ['./add-inside.component.less']
})
export class AddInsideComponent implements OnInit {

  constructor(private dialogref: MatDialogRef<AddInsideComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
  }
  close(): void {
    this.dialogref.close();
  }

}
