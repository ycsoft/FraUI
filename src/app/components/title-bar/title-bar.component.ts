import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserInfoService} from '../../services/user-info.service';
import {SessionStorageService} from '../../services/session-storage.service';
import {environment} from '../../../environments/environment';
import {LoginUtilsModule} from '../../module/login-utils/login-utils.module';
import {UserInfo} from '../../beans/user-info';
import {RegInfo} from '../../beans/reg-info';
import md5 from 'js-md5';
import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {Result} from '../../beans/result';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {

  private ENTER = 13;
  fold = false;
  public check_reg = false;
  private userInfo: UserInfo = new UserInfo();
  private regInfo: RegInfo = new RegInfo();

  @Input() keywords = '';
  @Output() OnSearch = new EventEmitter<string> ();
  @Output() OnLogin = new EventEmitter();

  constructor(
                private http: Http,
                private router: Router,
                public sessionStorage: SessionStorageService,
                private login_utils: LoginUtilsModule
              ) { }

  ngOnInit() {
    this.userInfo.isLogin = this.sessionStorage.getItem('isLogin');
    this.userInfo.user_id = this.sessionStorage.getItem('user');
    this.userInfo.sessionid = this.sessionStorage.getItem('sessionid');
    this.userInfo.pwd = this.sessionStorage.getItem('pwd');
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
  // 查询！ 此处直接将查询请求提交至结果页进行处理
  //
  search() {
    this.OnSearch.emit(this.keywords);
  }
  //
  // 回车事件
  //
  keypress($event) {
    if ($event.keyCode === this.ENTER) {
      this.OnSearch.emit(this.keywords);
    }
  }
  //
  // 回到主页
  //
  backHome() {
    this.router.navigateByUrl('/home');
  }
  fold_unfold() {
    this.fold = !this.fold;
    if (this.fold) {
      document.getElementById('fold').setAttribute('src', '../../../assets/images/btn_menufold.svg');
    } else {
      document.getElementById('fold').setAttribute('src', '../../../assets/images/btn_menuunfold.svg');
    }
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
  //
  // 注销登录
  //
  logOut() {
    this.login_utils.logOut();
    this.userInfo.isLogin = false;
  }
  onLogin() {
   this.userInfo.isLogin = this.sessionStorage.getItem('isLogin');
   this.userInfo.user_id = this.sessionStorage.getItem('user');
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
}
