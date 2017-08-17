import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from '../../services/session-storage.service';
import { environment} from '../../../environments/environment';
import { Result} from '../../beans/result';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {

  show_info = false;
  company_name = '';
  company_web_site = '';
  company_addr = '';
  company_contact = '';
  company_phone = '';
  company_email = '';
  //
  // 账户剩余金额
  //
  money_left = 0;
  constructor(private sessionStorage: SessionStorageService,
              private http: Http) { }

  ngOnInit() {
    console.log('获取用户信息');
    const params = {};
    params['method'] = 'isel_user_company';
    params['token'] = this.sessionStorage.getItem('token');
    params['user_id'] = this.sessionStorage.getItem('user');
    console.log('Token: ' + params['token'])
    const options = new RequestOptions({  params:  params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':7001/register';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result = response.json();
        console.log(result);
        if (result.code === 0 ) {
        } else {
          alert(result.msg);
        }
      });
  }

}
