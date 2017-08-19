import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from '../../../app/services/session-storage.service';
import { ChartDataService } from '../../../app/services/chart-data.service';
import { Order } from '../../../app/beans/order';
import { Guid } from '../../../app/services/guid';
import { Result } from '../../../app/beans/result';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { OrderResource } from '../../../app/resources/order.resource';
import { ProvinceCityService } from '../../../app/services/province-city.service';
import { DataResource } from '../../../app/resources/data.resource';
import { Utils } from '../../../app/services/utils';
import { AlertService } from '../../../app/services/alert.service';
import { Alert } from '../../../app/beans/alert';
import { AlertType } from '../../../app/beans/alert-type.enum';
import { PayTypes } from '../../../app/beans/pay-type';

declare var $: any;

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [OrderResource, ProvinceCityService, DataResource]
})
export class OrderComponent implements OnInit {

    chartlist = [];

    totalMoney = 0;

    chartOption = {};

    order = new Order();

    keywords = '';

    // 用户会话信息
    user = '';
    token = '';
    money = '';

    showEmail = false;

    showAddr = true;

    provinces = [];

    cities = [];

    value;

    echartsIntance;
    //
    // 支付方式
    //
    pay_types = PayTypes;
    pay_type = this.pay_types.PAY_REMAIN;
    //
    // Tooltip提示
    //
    title = 'Hello';

    @ViewChild('orderForm') orderForm: FormControl;

    @ViewChild('invoiceChoice') invoiceChoice: ElementRef;

    constructor(private sessionStorageService: SessionStorageService,
        private chartDataService: ChartDataService,
        private orderResource: OrderResource,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private provinceCityService: ProvinceCityService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params) => {
            this.keywords = params['keywords'];
            const chartData = this.sessionStorageService.getItem('chartData');
            this.order.total_amount = this.totalMoney = this.sessionStorageService.getItem('totalMoney');
            this.order.rules = this.sessionStorageService.getItem('rule_ids');

            // 获取用户会话信息
            this.user = this.sessionStorageService.getItem('user');
            this.token = this.sessionStorageService.getItem('token');
            this.money = this.sessionStorageService.getItem('money');
            console.log('=======================get freesmall from order:');
            console.log(this.sessionStorageService.getItem('freesmall'));
            this.order.freesmall = (this.sessionStorageService.getItem('freesmall'));

            this.order.order_no = Guid.newGuid();
            this.order.keywords = this.keywords;
            const arr = [];
            chartData.nodes.forEach(element => {
                const obj = Object.assign({}, element);
                if (obj.contentList.length > 0) {
                    obj.symbolSize = this.chartDataService.getSize(element.size * 0.9);
                }
                obj.chartBean = undefined;
                obj.contentList = undefined;
                arr.push(obj);
            });

            this.chartOption = this.getChartOption([], arr, chartData.lines);
            chartData.nodes.forEach(element => {
                // if (!element.free) {
                element.symbolSize = this.chartDataService.getSize(element.size * 0.9);
                const ele = Object.assign({}, element);
                ele.chartBean = undefined;
                ele.contentList = undefined;
                const chartOption = this.getChartOption([], [ele], []);
                chartOption.series[0].width = '40%';
                chartOption.series[0].height = '40%';
                chartOption.series[0].left = '70%';
                element.chartOption = chartOption;
                this.chartlist.push(element);
                // }
            });

            this.setProvince();
        });
    }

    private setProvince() {
        this.provinceCityService.getProvice().then((provinces: any[]) => {
            this.provinces = provinces;
        });
    }

    private getRuleIds(chartlist) {
        let ids = '';
        chartlist.forEach((element, index) => {
            if (index === chartlist.length - 1) {
                ids += element.rule_id;
            } else {
                ids += element.rule_id + '-';
            }
        });
        return ids;
    }

    private getChartOption(categories, nodes, lines) {
        return {
            // tooltip: {},
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
                    width: '50%',
                    height: '50%',
                    left: 'center',
                    label: {
                        normal: {
                            position: 'right',
                            formatter: '{b}'
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

    submitOrder() {
        const islogin = this.sessionStorageService.getItem('isLogin');
        if (!islogin) {
          alert('请登录');
          return;
        }
        if (this.orderForm.invalid) {
          console.log('this.orderForm.invalid');
            if (this.orderForm['controls'].email.invalid) {
                if (Utils.isEmpty(this.order.email)) {
                    this.order.errors.email = true;
                    return;
                }
            }
            if (this.orderForm['controls'].inv_header && this.orderForm['controls'].inv_header.invalid) {
                this.order.errors.inv_header = true;
                return;
            }
            if (this.orderForm['controls'].contacts && this.orderForm['controls'].contacts.invalid) {
                this.order.errors.contacts = true;
                return;
            }
            if (this.orderForm['controls'].phone && this.orderForm['controls'].phone.invalid) {
                this.order.errors.phone = true;
                return;
            }
        }
        // this.order.total_amount = 0.01;
        //
        // 将用户会话信息写入表单，进行提交
        //
        console.log('this.orderForm next send');
        this.order.user = this.user;
        this.order.token = this.token;
        this.order.money = this.money;

      const newTab = window.open('about:blank');
      console.log('请求发送');
        this.orderResource.postOrder(this.order, (result: Result) => {
            console.log('请求已发送');
            console.log(result);

            newTab.location.href = result.data['url'];
            console.log(result.data['money']);
            console.log(result.data['money']);
            this.money = result['money'];
            this.sessionStorageService.setItem('money', result['money']);
        });
    }

    search(keywords: string) {
        this.keywords = keywords;
        console.log(this.token);
        this.router.navigate(['/result', this.keywords]);
    }

    public selectedProvice(value: any): void {
        this.provinceCityService.getCities(value.text).then((cities: any[]) => {
            this.order.province = value.id;
            this.cities = cities;
        });
    }

    public removedProvice(value: any) {
        console.log('Removed value is: ', value);
        this.cities = [];
    }

    public selectedCity(value: any) {
        this.order.city = value.id;
    }

    public focus() {
        setTimeout(() => {
            $('.result-container1').animate({
                'scrollTop': 1000
            }, 500);
        }, 100);
    }
}
