import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  dt_start: Date = new Date();
  dt_end: Date = new Date();
  dateDisabled: {date: Date, mode: string[]}[];
  select_start = false;
  select_end = false;

  items = [1, 2, 3, 4, 5, 6, 7];
  constructor() { }

  ngOnInit() {
  }

  //
  // 日期选择
  //
  start_click() {
    this.select_start = !this.select_start ;
  }
  end_select() {
    this.select_end = !this.select_end;
  }

}
