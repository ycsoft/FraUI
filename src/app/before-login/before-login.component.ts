///<reference path="../services/user-info.service.ts"/>
import { Component, OnInit, Input } from '@angular/core';
import {UserInfoService} from '../services/user-info.service';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UserError} from '@angular/tsc-wrapped';
import { Result } from '../beans/result';
import md5 from 'js-md5';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { environment } from '../../environments/environment';
import { SessionStorageService } from '../services/session-storage.service';
import {LoginUtilsModule} from '../module/login-utils/login-utils.module';
@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss'],
})
export class BeforeLoginComponent implements OnInit {
  //
  // 注入SessionStorageService
  //
  constructor(
    public userInfo: UserInfoService,
    private http: Http,
    private sessionStorage: SessionStorageService,
    private login_utils: LoginUtilsModule) { }

  ngOnInit() {
    this.userInfo.sessionid = this.getCookie('PYCKET_ID');
    this.sessionStorage.setItem('sessionid', this.userInfo.sessionid);
    this.getCode();
    this.userInfo.isLogin = this.sessionStorage.getItem('isLogin');
    this.userInfo.user_id = this.sessionStorage.getItem('user');
    this.userInfo.pwd = this.sessionStorage.getItem('pwd');
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
  //
  // 登录
  //
  onLogin() {
    let params = {};
    params = this.userInfo;
    params['pwd'] = md5(this.userInfo.pwd);
    params['sessionid'] = this.userInfo.sessionid;
    const options = new RequestOptions({  params:  params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':8002/login/t/t';

    this.http.get(url, options).toPromise().then(
      (response) => {
      const result = response.json()
      console.log(response.json());
      if (result.code === 0 ) {
          console.log('login success!');
          this.userInfo.isLogin = true;
        this.sessionStorage.setItem('user', this.userInfo.user_id);
        this.sessionStorage.setItem('pwd', this.userInfo.pwd);
        this.sessionStorage.setItem('isLogin', true);
        this.sessionStorage.setItem('token', result.token);
      } else {
        alert(result.msg);
      }
    });
  }
  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid=' + this.userInfo.sessionid + '&r=' + Math.random();
    document.getElementById('vcode').setAttribute('src', srctag );
    document.getElementById('vcode2').setAttribute('src', srctag );
  }
  //
  // 注销登录
  //
  logOut() {
    this.login_utils.logOut();
  }
}
