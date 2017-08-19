import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionStorageService} from '../../services/session-storage.service';
import {environment} from '../../../environments/environment';
import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import {UserInfoService} from '../../services/user-info.service';
import md5 from 'js-md5';
import {UserInfo} from '../../beans/user-info';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class LoginUtilsModule {
  constructor(private sessionStorage: SessionStorageService, private http: Http, private router: Router) {
  }
  //
  // 注销登录
  //
  logOut() {
    const token = this.sessionStorage.getItem('token');
    const user = this.sessionStorage.getItem('user');
    const url = environment.apiserver + ':8002/logout/' + user + '/' + token;
    console.log('退出:' + url);
    this.http.get(url).toPromise().then( (response) => {
      console.log(response);
    });
    this.sessionStorage.setItem('isLogin', false);
    // this.router.navigateByUrl('/home');
  }
  //
  // 登录
  //
  onLogin(userInfo: UserInfo) {
    let params = {};
    console.log(userInfo);
    this.sessionStorage.setItem('pwd', userInfo.pwd);
    this.sessionStorage.setItem('user', userInfo.user_id);
    params = {};
    params['pwd'] = md5(userInfo.pwd);
    console.log('密码MD5：' + params['pwd']);
    params['sessionid'] = userInfo.sessionid;
    params['vcode'] = userInfo.vcode;
    params['user_id'] = userInfo.user_id;
    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':8002/login/t/t';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result = response.json()
        console.log(response.json());
        if (result.code === 0 ) {
          console.log('login success!');
          userInfo.isLogin = true;
          console.log(result);
          this.sessionStorage.setItem('user', userInfo.user_id);
          this.sessionStorage.setItem('isLogin', true);
          this.sessionStorage.setItem('token', result.token);
          this.sessionStorage.setItem('money', result.money);
        } else {
          alert(result.msg);
        }
      });
  }
  //
  // 获取验证码
  //
  getCode(sessionid: string): string {
    console.log('获取验证码');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid=' + sessionid + '&r=' + Math.random();
    return srctag;
  }
}
