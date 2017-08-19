import {Component, OnInit} from '@angular/core';
import {SessionStorageService} from '../../services/session-storage.service';
import {environment} from '../../../environments/environment';
import {Result} from '../../beans/result';
import {Headers, Http, RequestMethod, RequestOptions} from '@angular/http';
import {UserCompany} from '../../beans/user_company';
import {copyObj} from "@angular/animations/browser/src/util";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  user_company = new UserCompany();
  //
  // 账户剩余金额
  //
  money_left = 0;
  constructor(private sessionStorage: SessionStorageService,
              private http: Http) {
  }

  ngOnInit() {
    console.log('获取用户信息');
    let params = {};
    params = Object.create(this.user_company);
    params['method'] = 'isel_user_company';
    params['token'] = this.sessionStorage.getItem('token');
    params['user_id'] = this.sessionStorage.getItem('user');
    console.log('User is:' + params['user_id']);
    console.log('Token: ' + params['token'])
    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':7001/register';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result = response.json();
        if (result.count > 0) {
          this.user_company = result.data[0];
        } else {
          //
          // 未查询到用户信息，进行标记
          //
          this.user_company.sid = null;
        }

        console.log(result);
        if (result.code === 0) {
        } else {
          alert(result.msg);
        }
      });
  }

  updateCompany() {
    const params = JSON.parse( JSON.stringify(this.user_company) );
    params['token'] = this.sessionStorage.getItem('token');
    params['user_id'] = this.sessionStorage.getItem('user');
    console.log('params: ');
    console.log(params);
    if (this.user_company.sid == null ) {
      console.log('user sid is null');
      params['method'] = 'iadd_user_company';
    } else {
      console.log('user sid is not null: ' + this.user_company.sid);
      params['method'] = 'iupd_user_company';
    }
    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':7001/register'

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result: Result = response.json()
        console.log(response.json());
        if (result.code === 0) {
          console.log(result);
          console.log(result.msg);
        } else {
          console.log(result.msg);
        }
      });
  }

}
