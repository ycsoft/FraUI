import { Component, OnInit } from '@angular/core';
import {UserInfoService} from '../services/user-info.service';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss'],
  providers: [UserInfoService]
})
export class BeforeLoginComponent implements OnInit {

  isLogin: boolean;
  userName: String;
  constructor(private userinfo: UserInfoService, private http: Http) { }
  ngOnInit() {
    this.isLogin = this.userinfo.isLogin;
    this.userName = this.userinfo.userName;
  }
  //
  // 登录
  //
  onLogin() {
    console.log('click');
    this.http.get('http://www.fraplus.cn:8002/login/test/test')
      .toPromise()
      .then(response => {
        console.log(response);
      });
  }
  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    this.http.get('http://10.200.187.131:7001/vcode').toPromise().then(response => {
      // document.getElementById('vcode').setAttribute('src',);
      console.log('pass');
    });
    document.getElementById('vcode').setAttribute('src', 'http://10.200.187.131:7001/vcode');
  }
}
