import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'workers';
  hidden_sidebar: boolean = false;


  getOutput(any: boolean): void {
    this.hidden_sidebar = any;
  }
}


