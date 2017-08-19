import {Component, OnInit} from '@angular/core';
import {UserInfoModify} from '../../beans/userInfoModify';
import {SessionStorageService} from '../../services/session-storage.service';
import {Headers, Http, RequestMethod, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';
import {Result} from '../../beans/result';
import md5 from 'js-md5';

@Component({
  selector: 'app-modify-code',
  templateUrl: './modify-code.component.html',
  styleUrls: ['./modify-code.component.scss']
})
export class ModifyCodeComponent implements OnInit {

  show_modify = false;
  newUser = new UserInfoModify();

  constructor(private sessionStorage: SessionStorageService,
              private http: Http) {
  }

  ngOnInit() {
  }

  modifyCode() {
    const params = {}
    params['pwd'] = md5(this.newUser.pwd);
    params['newpwd'] = md5(this.newUser.newpwd);
    alert(this.sessionStorage.getItem('token'));
    alert(this.sessionStorage.getItem('user'));
    params['token'] = this.sessionStorage.getItem('token');
    params['user_id'] = this.sessionStorage.getItem('user');
    if (this.newUser.newpwd !==  this.newUser.pwdagain) {
     alert('新密码确认输入需要一致!' + this.newUser.newpwd + this.newUser.pwdagain);
     return;
    }
    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':8002/modify/t/t/t/'

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result: Result = response.json()
        console.log(response.json());
        this.newUser.pwd = '';
        this.newUser.newpwd = '';
        if (result.code === 0) {
          this.sessionStorage.setItem('token', result.msgflag);
          alert('密码修改成功!');
          console.log(result.msg);
        } else {
          alert(result.msg);
          console.log(result.msg);
        }
      });
  }


}
