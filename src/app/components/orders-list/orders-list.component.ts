import {Component, OnInit, Input} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  dt_start: Date = new Date();
  dt_end: Date = new Date();
  dateDisabled: { date: Date, mode: string[] }[];
  select_start = false;
  select_end = false;

  items = [1, 2, 3, 4, 5, 6, 7];

  @Input() title = '';

  constructor() {
  }

  ngOnInit() {

   // $(function () {
     //  $('#datetimepicker1').datetimepicker( );
   // });

    $(function () {
      $('#date1').datetimepicker({
        format: 'YYYY-MM-DD',
        locale: 'zh-cn',
        showTodayButton: true,
        showClear: true,
        showClose: true,
        ignoreReadonly: true,
        // defaultDate: moment()
      });

      $('#date2').datetimepicker({
        format: 'YYYY-MM-DD',
        locale: 'zh-cn',
        showTodayButton: true,
        showClear: true,
        showClose: true,
        ignoreReadonly: true,
        // defaultDate: moment()
      });


    });

  }

  //
  // 日期选择
  //
  start_click() {
    this.select_start = !this.select_start;
  }

  end_select() {
    this.select_end = !this.select_end;
  }

}
