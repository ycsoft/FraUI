import { Injectable } from '@angular/core';
import { Resource, ResourceActionBase } from 'ngx-resource';
import { Http, Request, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { environment } from '../../environments/environment';
import { Result } from '../../app/beans/result';
import { AlertService } from '../../app/services/alert.service';
import { AlertType } from '../../app/beans/alert-type.enum';

@Injectable()
export class RestClient extends Resource {

    constructor(http: Http,
        private alertService: AlertService) {
        super(http);
    }

    // $getHeaders(methodOptions?: any): any {
    //   let headers: any = {};

    //   // if (methodOptions.auth) {
    //   //   headers.Authorization = localStorage.get('token');
    //   // }

    //   return headers;
    // }

    //   $setUrl(url: string){
    //       console.log(url);
    //   }

    //   $getUrl(methodOptions?: ResourceActionBase): string | Promise<string> {
    //     const resPath = super.$getUrl();
    //     return environment.url + resPath;
    //   }

    $requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request {
        // req.url = environment.url + req.url;
        this.alertService.loading(true);
        return req;
    }

    $responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {

        return Observable.create((subscriber: Subscriber<any>) => {

            observable.subscribe(
                (res: Response) => {
                    // if (res.headers) {
                    //   let newToken: string = res.headers.get('Authorization');
                    //   if (newToken) {
                    //     localStorage.setItem('token', newToken);
                    //   }
                    // }
                    console.log(res);
                    this.alertService.loading(false);
                    const result = ((<any>res)._body ? res.json() : {}) as Result;
                    if (result.code !== undefined) {

                        subscriber.next(result);
                        /*
                        * result的code值本身具有逻辑意义，不可统一按错误处理
                        *
                        if (result.code === 0) {
                            subscriber.next(result);
                        } else {
                            const alert = {
                                type: AlertType.danger,
                                msg: '抱歉，未能获取正确结果，请更换关键词后重试'
                            };
                            this.alertService.alert(alert);
                            subscriber.error(res);
                        }
                        */
                    } else {
                        const result1 = (<any>res)._body ? res.json() : {};
                        subscriber.next(result1);
                    }
                },
                (error: Response) => {
                    this.alertService.loading(false);
                    // I also made a layer to parse errors

                },
                () => subscriber.complete()
            );

        });
    }

}
