import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charge-list',
  templateUrl: './charge-list.component.html',
  styleUrls: ['./charge-list.component.scss']
})
export class ChargeListComponent implements OnInit {

  charge_list = [1, 2, 3, 4, 5, 6, 7, 8];
  charge_ok = true;
  constructor() { }

  ngOnInit() {
  }

}
