import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SessionStorageService} from '../../services/session-storage.service';
import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {

  display = [false, false, false, false, false, false, false, true];

  constructor(private activeRouter: ActivatedRoute,
              private sessionStorage: SessionStorageService,
              private  http: Http) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
        const id = params['id'];
        this.myMenuClick(id);
    });
    // console.log('获取用户信息');
    // const params = {};
    // params['method'] = 'isel_account';
    // params['token'] = this.sessionStorage.getItem('token');
    // console.log('Token: ' + params['token'])
    // const options = new RequestOptions({  params:  params, method: RequestMethod.Get});
    // console.log(options);
    // const url = environment.apiserver + ':7001/register';
    //
    // this.http.get(url, options).toPromise().then(
    //   (response) => {
    //     const result = response.json()
    //     console.log(response.json());
    //     if (result.code === 0 ) {
    //     } else {
    //       alert(result.msg);
    //     }
    //   });
  }

  myMenuClick(id) {
    const len = this.display.length;
    for (let i = 0 ; i < len; i++) {
      this.display[i] = false;
    }
    this.display[id] = true;
  }

}
