import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  display = [false, false, false, false, false, false, false, true];

  constructor() { }

  ngOnInit() {
  }

  myMenuClick(id) {
    const len = this.display.length;
    for (let i = 0 ; i < len; i++) {
      this.display[i] = false;
    }
    this.display[id] = true;
  }

}
