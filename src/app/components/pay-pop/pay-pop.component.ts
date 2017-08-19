import { Component, OnInit, Input } from '@angular/core';
import { PayTypes } from '../../../app/beans/pay-type';
import {SessionStorageService} from '../../services/session-storage.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-pay-pop',
  templateUrl: './pay-pop.component.html',
  styleUrls: ['./pay-pop.component.scss']
})
export class PayPopComponent implements OnInit {

  payType = PayTypes;
  money_left = 0;

  @Input() total_money = 0;
  //
  // 根据支付方式选择展示的内容
  //
  @Input() pay_type = this.payType.PAY_REMAIN;
  constructor(private  session: SessionStorageService,
              private  router: Router) { }
  ngOnInit() {
    this.money_left = this.session.getItem('money');
  }
  charge() {
    this.router.navigateByUrl('/info/7');
  }
}
