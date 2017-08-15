import { Component, OnInit } from '@angular/core';
import { PayTypes } from '../../../app/beans/pay-type';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit {

  pay_types = PayTypes;
  pay_type = PayTypes.PAY_ALI;
  constructor() { }

  ngOnInit() {
  }

}
