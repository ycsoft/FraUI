import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';
import {SessionStorageService} from '../../services/session-storage.service';

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
  money_left = 0;

  @Input()  menuId = -1;
  @Output() menuClick = new EventEmitter();
  constructor( private sessionStorage: SessionStorageService, private http: Http) { }
  ngOnInit() {
    console.log('获取用户信息');
    const params = {};
    params['method'] = 'isel_account';
    params['token'] = this.sessionStorage.getItem('token');
    console.log('Token: ' + params['token'])
    const options = new RequestOptions({  params:  params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':7001/register';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result = response.json()
        const data = result.data[0];
        this.money_left = data.money;
        this.sessionStorage.setItem('money', this.money_left);
        if (result.code === 0 ) {
        } else {
          alert(result.msg);
        }
      });
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
  //
  // 子菜单单击事件
  //
  subMenuClick(id) {
    console.log(id);
    this.menuClick.emit(id);
  }
}
