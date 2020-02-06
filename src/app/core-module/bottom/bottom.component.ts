import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.less']
})
export class BottomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openLink(eny: any): void {
    console.log(eny);
  }


}
