import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

  ngOnInit() {
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
