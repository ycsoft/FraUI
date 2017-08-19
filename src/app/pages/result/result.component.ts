import {Component, OnInit, state, style, transition, animate, trigger, ViewChild} from '@angular/core';
import {DataService} from '../../../app/services/data.service';
import {ChartDataService} from '../../../app/services/chart-data.service';
import {Result} from '../../../app/beans/result';
import {ChartBean} from '../../../app/beans/chart-bean';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionStorageService} from '../../../app/services/session-storage.service';
import {SearchResource} from '../../../app/resources/search.resource';
import {SmallTypeColorService} from '../../../app/services/small-type-color.service';
import {AlertService} from '../../../app/services/alert.service';
import {AlertType} from '../../../app/beans/alert-type.enum';

import {Http, RequestMethod, RequestOptions} from '@angular/http';
import {environment} from '../../../environments/environment';
import {UserInfo} from "../../beans/user-info";
import md5 from 'js-md5';

@Component({
  selector: 'app-result-component',
  templateUrl: 'result.component.html',
  styleUrls: ['result.component.scss'],
  providers: [SearchResource],
  animations: [
    trigger('resultState', [
      state('inactive', style({
        width: '22px',
        'min-width': '0'
      })),
      state('active', style({
        width: '33%',
        'min-width': '550px'
      })),
      transition('inactive => active', [animate('100ms ease-in')]),
      transition('active => inactive', [animate('100ms ease-out')])
    ]),
    trigger('reportState', [
      state('state1', style({
        transform: 'translateX(0)'
      })),
      state('state2', style({
        transform: 'translateX(120px)'
      })),
      transition('state1 <=> state2', animate('100ms ease-in-out'))
    ]),
    trigger('contentState', [
      state('state1', style({
        transform: 'translateX(-100%)',
        display: 'none'
      })),
      state('state2', style({
        transform: 'translateX(0)',
        display: 'block'
      })),
      state('state3', style({
        transform: 'translateX(100%)',
        display: 'none'
      })),
      transition('state1 <=> state2', animate('200ms ease-in-out')),
      transition('state2 <=> state3', animate('200ms ease-in-out'))
    ])
  ]
})
export class ResultComponent implements OnInit {

  isLoading = true;

  resultState = 'active';

  reportState = 'state1';

  contentPage1State = 'state2';

  contentPage2State = 'state3';

  currentPageNumber = 1;

  echartsIntance = null;

  totalItems = 124;

  currentPage = 4;

  isCheckAll = false;

  type = 'type1';

  chartOption = null;

  freeOne: any = <any>{chartBean: {}};

  chartlist = [];

  totalMoney = 0;

  keywords = '';
  user = undefined;
  token = undefined;
  money = 0;
  discount = 10;
  totalpayMoney = 0;

  result = null;
  resultdata = [];
  chartData = undefined;
  tipsHide = false;

  userInfo: UserInfo = new UserInfo();

  constructor(private dataService: DataService,
              private chartDataService: ChartDataService,
              private searchResource: SearchResource,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private sessionStorageService: SessionStorageService,
              private smallTypeColorService: SmallTypeColorService,
              private alertService: AlertService,
              private http: Http) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userInfo.isLogin = this.sessionStorageService.getItem('isLogin');
    this.activatedRoute.params.subscribe((params) => {

      this.keywords = params['keywords'];
      this.user = this.sessionStorageService.getItem('user');
      this.token = this.sessionStorageService.getItem('token');
      //
      // 用户的剩余金额从服务端获取
      //
      this.http.get(environment.apiserver + ':8002/money/' + this.user + '/' + this.token).toPromise().then(resp => {
        const data = resp.json();
        this.money = data['money'];
        this.discount = data['discount'];
        this.sessionStorageService.setItem('money', this.money);
        this.sessionStorageService.setItem('discount', this.discount);
      });

      this.search(this.keywords);
      this.isLoading = false;
    });
  }

  private setChartOption(categories, nodes, lines) {
    this.chartOption = {
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'circular',
          circular: {
            rotateLabel: true
          },
          data: nodes,
          links: lines,
          roam: true,
          width: '60%',
          height: '60%',
          label: {
            normal: {
              position: 'right',
              formatter: '{b}',
              textStyle: {
                fontSize: 14
              }
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0.3
            }
          }
        }
      ]
    };
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }

  resizeChart() {
    if (this.echartsIntance) {
      this.echartsIntance.resize();
    }
  }

  onChartClick(event) {
    if (typeof event.seriesIndex === 'undefined') {
      return;
    }
  }

  private addOrRemoveInCharList(obj) {
    let isExist = false;
    for (let i = 0; i < this.chartlist.length; i++) {
      if (this.chartlist[i].rule_id === obj.rule_id) {
        this.chartlist.splice(i, 1);
        isExist = true;
        break;
      }
    }
    if (isExist === false) {
      obj.selected = true;
      this.chartlist.push(obj);
    }
  }

  changeReulstState() {
    if (this.resultState === 'active') {
      this.resultState = 'inactive';
    } else {
      this.resultState = 'active';
    }
    setTimeout(() => {
      this.resizeChart();
    }, 100);
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  changeContentPage(index: number) {
    if (index === 2) {
      const newTab = window.open('about:blank');
      newTab.location.href = 'http://www.fractalplus.cn/#scroll-5';
    }
  }
  search(keywords: string) {
    this.resultdata = [];
    this.isLoading = true;
    this.keywords = keywords;
    console.log(this.keywords);
    const keyinput = this.keywords
    if (this.keywords) {
      this.keywords = keywords.replace(/\,|\，/g, ' ');
      console.log('开始查询:');
      const url = environment.server1 + '/search/?keywords=' + keywords + '&user=' + this.user + '&token=' + this.token;
      this.http.get(url).toPromise().then((response) => {
        const result = response.json();
        if (result.data.length === 0) {
          this.alertService.alert({
            type: AlertType.info,
            msg: '没有查到内容，请输入其他关键词试试！'
          });
        }else if (result.code === -2) {
          this.alertService.alert({
            type: AlertType.info,
            msg: '测试体验用户  只能输入下列关键词:爱吃零食 早起 拖延症 关注健康 淘宝控！'
          });
        } else {
          this.result = result;
          this.type = 'type1';
          this.chartlist.length = 0;
          // resultdata
          for (const entrytop of result.data) {
            const osmall = entrytop.small;
            const oprice = entrytop.price;
            const osize = entrytop.size;
            const ofree = entrytop.free;
            for (const entry of entrytop.feat) {
              const chartBean = new ChartBean();
              chartBean.small = osmall;
              chartBean.price = oprice;
              chartBean.size = osize;
              chartBean.free = ofree;
              chartBean.rule_id = entry.rule_id;
              chartBean.likely = entry.likely;
              chartBean.content = entry.content;
              this.resultdata.push(chartBean);
            }
          }
          // this.chartData = this.chartDataService.getChartData(result.data);
          this.chartData = this.chartDataService.getChartData(this.resultdata);
          this.freeOne = this.chartDataService.getFree(this.chartData.nodes);
          this.setChartOption([], this.chartData.nodes, this.chartData.lines);
          this.chartData.nodes.forEach(element => {
            this.chartlist.push(element);
          });

          const rules = this.sessionStorageService.getItem('rule_ids');
          if (rules !== null && rules.length > 0) {
            const ids = rules.split('-');
            ids.forEach(id => {
              const chart = this.chartlist.find((element) => element.chartBean.rule_id === id);
              if (chart !== undefined) {
                chart.chartBean.checked = true;
              }
            });
          }
          this.isCheckAll = this.isCheckedAll();
          this.getTotalMoney();
        }
      });
    }
    this.isLoading = false;
  }

  private getTotalMoney() {
    this.totalMoney = 0;
    this.totalpayMoney = 0;
    this.chartlist.forEach(element => {
      if (element.chartBean.checked && element.contentList.length > 0) {
        this.totalMoney += element.discountPrice;
      }
    });
    this.totalpayMoney = this.totalMoney * this.discount / 10
  }

  checked(element) {
    element.chartBean.checked = !element.chartBean.checked;
    this.isCheckAll = this.isCheckedAll();
    this.getTotalMoney();
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
    this.chartlist.forEach((element) => {
      element.chartBean.checked = this.isCheckAll;
    });
    this.getTotalMoney();
  }

  toPay() {
    if  (!this.sessionStorageService.getItem('isLogin')) {
      return;
    }
    const filtered = this.filterChecked(this.chartlist);
    const freeNode = this.chartlist.find((element) => element.chartBean.free && element.contentList.length > 0);
    if (freeNode.chartBean.checked === false) {
      const list = freeNode.contentList.filter((element) => element.free);
      if (list.length > 0) {
        freeNode.contentList = list;
        freeNode.totalPrice = list[0].price;
        freeNode.discountPrice = 0;
      }
      filtered.push(freeNode);
      filtered.push(this.chartlist.find((element) => element.chartBean.free && element.contentList.length === 0));
    }
    const array = [];
    filtered.forEach((element) => {
      array.push(element);
    });
    this.chartData.nodes = array;
    this.sessionStorageService.setItem('chartData', this.chartData);
    this.sessionStorageService.setItem('totalMoney', this.totalMoney);
    this.sessionStorageService.setItem('totalpayMoney', this.totalpayMoney);
    this.sessionStorageService.setItem('rule_ids', this.getSmalls(this.chartlist));
    this.sessionStorageService.setItem('freesmall', this.freeOne.name);
    this.router.navigate(['/order', this.keywords]);
  }

  filterChecked(chartlist) {
    const array = [];
    chartlist.forEach(element => {
      if (element.chartBean.checked) {
        array.push(element);
      }
    });
    return array;
  }

  private getRuleIds(chartlist) {
    let ids = '';
    const filtered = this.filterChecked(this.chartlist);
    filtered.forEach((ele1) => {
      if (ele1.contentList.length > 0) {
        ele1.contentList.forEach(element => {
          if (!element.free) {
            ids += element.rule_id + '-';
          }
        });
      }
    });
    const free = this.result.data.find((element) => element.free);
    ids += free.rule_id;
    return ids;
  }

  private getSmalls(chartlist) {
    let smalls = '';
    const filtered = this.filterChecked(this.chartlist);
    filtered.forEach((ele1) => {
      if (ele1.contentList.length > 0) {
        ele1.contentList.forEach(element => {
          if (!element.free && !(smalls.indexOf(element.small) > -1)) {
            // alert(smalls.indexOf(element.small)+smalls+ ":"+element.small);

            smalls += element.small + '-';
          }
        });
      }
    });
    const free = this.result.data.find((element) => element.free);
    smalls += free.small;

    return smalls;

  }

  private isCheckedAll() {
    return this.chartlist.find((element) => element.chartBean.checked === false) === undefined;
  }

  //
  // 获取验证码
  //
  getCode() {
    console.log('获取验证码');
    const srctag = environment.apiserver + ':7001/vcode?' + 'sessionid='
      + this.sessionStorageService.getItem('sessionid') + '&r=' + Math.random();
    document.getElementById('vcode').setAttribute('src', srctag );
    document.getElementById('vcode2').setAttribute('src', srctag );
  }
  onLogin() {
    const userInfo = this.userInfo;
    this.getCode();
    let params = {};
    console.log('密码: ' + this.userInfo.pwd);
    this.sessionStorageService.setItem('pwd', userInfo.pwd);
    this.sessionStorageService.setItem('user', userInfo.user_id);
    params = {};
    params['pwd'] = md5(userInfo.pwd);
    console.log('密码MD5：' + params['pwd']);
    params['sessionid'] = userInfo.sessionid;
    params['vcode'] = userInfo.vcode;
    params['user_id'] = userInfo.user_id;
    const options = new RequestOptions({params: params, method: RequestMethod.Get});
    console.log(options);
    const url = environment.apiserver + ':8002/login/t/t';

    this.http.get(url, options).toPromise().then(
      (response) => {
        const result = response.json()
        console.log(response.json());
        if (result.code === 0 ) {
          console.log('login success!');
          console.log(result);
          this.sessionStorageService.setItem('user', userInfo.user_id);
          this.sessionStorageService.setItem('isLogin', true);
          this.sessionStorageService.setItem('token', result.token);
          this.sessionStorageService.setItem('money', result.money);
          this.userInfo.isLogin = true;
        } else {
          alert(result.msg);
        }
      });
  }
}
