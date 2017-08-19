import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorageService} from '../../services/session-storage.service';
import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  display = [false, false, false, false, false, false, false, true];

  title_done    = '已完成订单';
  title_topay   = '待支付订单';
  title_tocheck = '待审核订单';

  money_left = 0;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private sessionStorage: SessionStorageService,
              private  http: Http) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
        const id = params['id'];
        this.myMenuClick(id);
    });
    // console.log('获取用户信息');
    // const params = {};
    // params['method'] = 'isel_account';
    // params['token'] = this.sessionStorage.getItem('token');
    // console.log('Token: ' + params['token'])
    // const options = new RequestOptions({  params:  params, method: RequestMethod.Get});
    // console.log(options);
    // const url = environment.apiserver + ':7001/register';
    //
    // this.http.get(url, options).toPromise().then(
    //   (response) => {
    //     const result = response.json()
    //     console.log(response.json());
    //     if (result.code === 0 ) {
    //     } else {
    //       alert(result.msg);
    //     }
    //   });
  }

  myMenuClick(id) {
    const len = this.display.length;
    for (let i = 0 ; i < len; i++) {
      this.display[i] = false;
    }
    this.display[id] = true;
  }

  //
  // 查询
  //
  search(keywords: string) {
    this.router.navigateByUrl('/result/' + keywords);
  }
  //
  // 用户金额
  //
  getMoney(money) {
    this.money_left = money;
  }
}
