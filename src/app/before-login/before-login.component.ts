///<reference path="../services/user-info.service.ts"/>
import { Component, OnInit, Input } from '@angular/core';
import {UserInfoService} from '../services/user-info.service';
import {Headers, Http, RequestMethod, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {UserError} from "@angular/tsc-wrapped";
import {UserInfo} from '../beans/user-info';
import {Result} from '../beans/result';
import md5 from 'js-md5'
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {Pass} from "tsickle";

@Component({
  selector: 'app-before-login',
  templateUrl: './before-login.component.html',
  styleUrls: ['./before-login.component.scss'],
  providers: [UserInfoService]
})
export class BeforeLoginComponent implements OnInit {

  userInfo = new UserInfo();
  sessionid = null;

  constructor(private userinfo: UserInfoService, private http: Http) { }
  ngOnInit() {

    function getCookie(name)
    {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
      else
        return null;
    }

    this.sessionid=getCookie('PYCKET_ID')
    this.getCode();
  }
  //
  // 登录
  //
  onLogin() {
    console.log('click');
    console.log(this.userInfo.user_id);
    console.log(this.userInfo.pwd);
    console.log(this.userInfo.vcode);



    //let headers = new Headers({ 'Head':'head'});
    //headers.append("Accept", "application/json");
    let params = {}
    params=this.userInfo;
    params['pwd']=md5(this.userInfo.pwd);
    params['sessionid']=this.sessionid;
    //params=this.userInfo;
    let options = new RequestOptions({  params:  params  ,method:RequestMethod.Get});
    console.log(options);
    //let url = "http://localhost:7001/register?method=isel_user_company&user_sid=0"
    let url = "http://127.0.0.1:8002/login/t/t"
    //this.http.get(url, options).toPromise().then((response) => {
    //  let result:Result=response.json()
    //  alert(result.msg);
      //alert(result.data[0].company_name);
    //  console.log(response.json());
    //  if (result.code==1 ) Pass;
    //});

    this.http.get(url, options).toPromise().then(
      (response) => {
      let result:Result=response.json()
      alert(result.msg);
      //alert(result.data[0].company_name);
      console.log(response.json());
      if (result.code==1 ) Pass;
    })


  }
  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    let srctag= 'http://127.0.0.1:7001/vcode?' +'sessionid='+this.sessionid+'&r='+Math.random();
    document.getElementById('vcode').setAttribute('src', srctag );
    document.getElementById('vcode2').setAttribute('src', srctag );

  }


}
