import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-menu-bar',
  templateUrl: './left-menu-bar.component.html',
  styleUrls: ['./left-menu-bar.component.scss']
})
export class LeftMenuBarComponent implements OnInit {

  basic_info = true;
  order_report = true;
  invoice_mana = true;
  account_mana = true;
  constructor() { }

  ngOnInit() {
  }

  //
  // 菜单单击展开与伸缩的控制
  //
  basic_click() {
    this.basic_info = ! this.basic_info;
  }
  order_report_click() {
    this.order_report = ! this.order_report;
  }
  invoice_mana_click() {
    this.invoice_mana = ! this.invoice_mana;
  }
  account_mana_click() {
    this.account_mana = ! this.account_mana;
  }

}
