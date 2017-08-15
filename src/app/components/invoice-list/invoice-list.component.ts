import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  show_invoice = true;
  show_start = false;
  show_end = false;
  invo_list = [1, 2, 3, 4, 5, 6, 7];
  constructor() { }

  ngOnInit() {
  }

  start_click() {
    this.show_start = !this.show_start;
  }
  end_click() {
    this.show_end = !this.show_end;
  }

}
