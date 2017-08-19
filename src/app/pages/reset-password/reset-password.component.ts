import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {SessionStorageService} from '../../services/session-storage.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private sessionStorage: SessionStorageService,
              private http: Http) { }

  email = '';
  vcode = '';

  ngOnInit() {
    this.getCode();
  }
  //
  // 获取验证码
  //
  getCode() {
    const sessionid = this.sessionStorage.getItem('sessionid');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid=' + sessionid + '&r=' + Math.random();
    document.getElementById('vcode3').setAttribute('src', srctag);
  }
  //
  // 找回密码
  //
  send_email() {
    const url = environment.apiserver + ':7001/register?';
    const params = {};
    params['sessionid'] = this.sessionStorage.getItem('sessionid');
    params['user_email'] = this.email;
    params['vcode'] = this.vcode;

    this.http.get(url, params).toPromise().then((response) => {
      const result = response.json();
      console.log(result);
    });
  }
}
