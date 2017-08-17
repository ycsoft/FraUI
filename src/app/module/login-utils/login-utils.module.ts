import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SessionStorageService} from '../../services/session-storage.service';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class LoginUtilsModule {
  constructor(private sessionStorage: SessionStorageService, private http: Http) {
  }
  //
  // 注销登录
  //
  logOut() {
    const token = this.sessionStorage.getItem('token');
    const user = this.sessionStorage.getItem('user');
    const url = environment.apiserver + ':8002/logout/' + user + '/' + token;
    this.http.get(url).toPromise().then( (response) => {
      console.log(response);
      this.sessionStorage.setItem('isLogin', false);
    });
  }
}
