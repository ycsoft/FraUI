///<reference path="../services/user-info.service.ts"/>
import {Component, OnInit, Input} from '@angular/core';
import {Headers, Http, RequestMethod, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UserError} from '@angular/tsc-wrapped';
import {Result} from '../beans/result';
import md5 from 'js-md5';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../services/session-storage.service';
import {LoginUtilsModule} from '../module/login-utils/login-utils.module';
import {Router} from '@angular/router';
import {UserInfo} from '../beans/user-info';
import {RegInfo} from '../beans/reg-info';
@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss'],
})
export class BeforeLoginComponent implements OnInit {
  //
  // 注入SessionStorageService
  //
  public check_reg = false;
  private userInfo: UserInfo = new UserInfo();
  private regInfo: RegInfo = new RegInfo();

  constructor(
    private http: Http,
    private sessionStorage: SessionStorageService,
    private router: Router,
    private login_utils: LoginUtilsModule) { }

  ngOnInit() {
    this.userInfo.sessionid = this.getCookie('PYCKET_ID');
    this.regInfo.sessionid = this.getCookie('PYCKET_ID');
    this.sessionStorage.setItem('sessionid', this.userInfo.sessionid);
    this.getCode();
    this.userInfo.isLogin = this.sessionStorage.getItem('isLogin');
    this.userInfo.user_id = this.sessionStorage.getItem('user');
    this.userInfo.pwd = this.sessionStorage.getItem('pwd');
    console.log('保存的密码是:' + this.userInfo.pwd);
  }

  //
  // 读取COOKIE
  //
  getCookie(key: string): string {
    const reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
    const attr = document.cookie.match(reg);
    if (attr) {
      return decodeURIComponent(attr[2]);
    } else {
      return null;
    }
  }
  //
  // 登录
  //
  onLogin() {
    this.login_utils.onLogin(this.userInfo);
  }

  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid=' + this.userInfo.sessionid + '&r=' + Math.random();
    document.getElementById('vcode').setAttribute('src', srctag);
    document.getElementById('vcode2').setAttribute('src', srctag);
  }
  //
  // 注册
  //
  onReg() {
    if (!this.check_reg) {
      alert('注册必须接受协议,请阅读接受!');
      return;
    }

    const params = JSON.parse(JSON.stringify(this.regInfo));
    console.log('用户输入密码:' + this.regInfo.pwd);
    params['pwd'] = md5(this.regInfo.pwd);
    params['sessionid'] = this.regInfo.sessionid;

    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':7001/register?' + 'method=register';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result: Result = response.json();
        console.log(response.json());
        if (result.code === 0) {
          console.log(result.msg);
        } else {
          console.log(result.msg);
        }
      });
  }
  //
  // 注销登录
  //
  logOut() {
    this.login_utils.logOut();
    this.userInfo.isLogin = false;
  }
  //
  // 基本信息
  //
  basic_info() {
    this.router.navigateByUrl('/info/0');
  }
  //
  // 订单管理
  //
  order_click() {
    this.router.navigateByUrl('/info/2');
  }
  //
  // 发票管理
  //
  invoice_click() {
    this.router.navigateByUrl('/info/5');
  }
  //
  // 充值管理
  //
  charge_click() {
    this.router.navigateByUrl('/info/7');
  }
}
