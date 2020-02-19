import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {
  @Output() naviOutput = new EventEmitter<boolean>();
  navibool:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  sendOutput(): void {
    this.navibool = !this.navibool;
    this.naviOutput.emit(this.navibool);
    console.log('dziala');
    console.log(this.navibool);
  }

}
