import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import {UserInfo} from '../../beans/user-info';
import {RegInfo} from '../../beans/reg-info';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {environment} from "../../../environments/environment";
import {LoginUtilsModule} from "../../module/login-utils/login-utils.module";
import {SessionStorageService} from "../../services/session-storage.service";
import md5 from 'js-md5';
import {Http, RequestMethod, RequestOptions} from "@angular/http";
import {Result} from "../../beans/result";

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss']
})
export class LoginRegComponent implements OnInit {
  //
  //
  // 目前ngx-bootstrap插件是可用的，不过HTML模板需要稍作调整
  // 下一个版本采用插件开发，已实现更便利的控制
  //
  userInfo: UserInfo = new UserInfo();
  regInfo: RegInfo = new RegInfo();
  modalRef: BsModalRef;
  check_reg: false;

  //
  // 向外部传递登录成功事件
  @Output()  OnLogin = new EventEmitter();
  constructor(
    private modalService: BsModalService,
    private login_utils: LoginUtilsModule,
    private sessionStorage: SessionStorageService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  //
  // 打开modal对话框
  openModal(template) {
    this.modalRef = this.modalService.show(template);
  }
  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    const srctag = this.login_utils.getCode(this.userInfo.sessionid);
    document.getElementById('vcode').setAttribute('src', srctag );
    document.getElementById('vcode2').setAttribute('src', srctag );
  }
  //
  // 登录
  //
  onLogin(userInfo: UserInfo) {
    console.log(userInfo);
    this.sessionStorage.setItem('pwd', userInfo.pwd);
    this.sessionStorage.setItem('user', userInfo.user_id);
    const params = {};
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
          this.OnLogin.emit();
        } else {
          alert(result.msg);
        }
      });
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
          alert('请登录邮箱激活账号');
        } else {
          alert(result.msg);
        }
      });
  }

}
