import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  show_info = false;
  show_modify = false;
  show_orders_complete = false;
  show_invoice = false;
  show_invoice_info = true;
  constructor() { }

  ngOnInit() {
  }

}
