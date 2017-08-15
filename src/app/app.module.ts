import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularEchartsModule } from 'ngx-echarts';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResourceModule } from 'ngx-resource';
import { TooltipModule, CollapseModule, DatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { BeforeLoginComponent } from '../app/before-login/before-login.component';
import { HomeComponent } from '../app/components/home/home.component';
import { TitleBarComponent } from '../app/components/title-bar/title-bar.component';
import { ResultComponent } from './pages/result/result.component';
import { CheckComponent } from './components/check/check.component';
import { CAlertComponent } from '../app/components/alert/alert.component';
import { OrderComponent } from './pages/order/order.component';
import { RadioComponent } from './components/radio/radio.component';

import { AlertService } from '../app/services/alert.service';
import { DataService } from '../app/services/data.service';
import { SmallTypeColorService } from '../app/services/small-type-color.service';
import { SessionStorageService } from '../app/services/session-storage.service';
import { ChartDataService } from '../app/services/chart-data.service';

import { RmbPipe } from '../app/pipes/rmb.pipe';

import { AutoContentHeightDirective } from './directives/auto-content-height.directive';
import { PayPopComponent } from './components/pay-pop/pay-pop.component';
import { LeftMenuBarComponent } from '../app/components/left-menu-bar/left-menu-bar.component';
import { AccountInfoComponent } from '../app/pages/account-info/account-info.component';
import { BasicInfoComponent } from '../app/components/basic-info/basic-info.component';
import { ModifyCodeComponent } from '../app/components/modify-code/modify-code.component';
import { OrdersListComponent } from '../app/components/orders-list/orders-list.component';
import { InvoiceListComponent } from '../app/components/invoice-list/invoice-list.component';
import { InvoiceInfoComponent } from '../app/components/invoice-info/invoice-info.component';
//
// 配置路由
//
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'result/:keywords',
    component: ResultComponent
  },
  {
    path: 'order/:keywords',
    component: OrderComponent
  },
  {
    path: 'bar',
    component: TitleBarComponent
  },
  {
    path: 'info',
    component: AccountInfoComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BeforeLoginComponent,
    HomeComponent,
    TitleBarComponent,
    ResultComponent,
    AutoContentHeightDirective,
    CheckComponent,
    RmbPipe,
    CAlertComponent,
    OrderComponent,
    RadioComponent,
    PayPopComponent,
    LeftMenuBarComponent,
    AccountInfoComponent,
    BasicInfoComponent,
    ModifyCodeComponent,
    OrdersListComponent,
    InvoiceListComponent,
    InvoiceInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularEchartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [
    AlertService,
    SessionStorageService,
    ChartDataService,
    DataService,
    SmallTypeColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
