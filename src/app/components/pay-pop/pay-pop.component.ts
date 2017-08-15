import { Component, OnInit, Input } from '@angular/core';
import { PayTypes } from '../../../app/beans/pay-type';
@Component({
  selector: 'app-pay-pop',
  templateUrl: './pay-pop.component.html',
  styleUrls: ['./pay-pop.component.scss']
})
export class PayPopComponent implements OnInit {

  payType = PayTypes;
  //
  // 根据支付方式选择展示的内容
  //
  @Input() pay_type = this.payType.PAY_REMAIN;
  constructor() { }
  ngOnInit() {
  }

}
