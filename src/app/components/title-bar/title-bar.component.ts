import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {UserInfoService} from '../../services/user-info.service';
import {SessionStorageService} from '../../services/session-storage.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {

  private ENTER = 13;
  fold = false;
  @Input() keywords = '';
  @Output() OnSearch = new EventEmitter<string> ();

  constructor(
                private router: Router,
                public userInfo: UserInfoService,
                public sessionStorage: SessionStorageService
              ) { }

  ngOnInit() {
    this.userInfo.isLogin = this.sessionStorage.getItem('isLogin');
    this.userInfo.user_id = this.sessionStorage.getItem('user');
  }
  //
  // 获取验证码
  //
  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid=' + this.userInfo.sessionid + '&r=' + Math.random();
    document.getElementById('vcode').setAttribute('src', srctag );
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
}
