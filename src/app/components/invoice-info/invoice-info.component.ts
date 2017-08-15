import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.scss']
})
export class InvoiceInfoComponent implements OnInit {

  info_list = [1, 2, 3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
  }

}
