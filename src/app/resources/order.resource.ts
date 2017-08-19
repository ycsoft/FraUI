import { Injectable } from '@angular/core';
import { ResourceParams, ResourceAction } from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import { RestClient } from '../../app/services/rest-client.service';
import { RequestMethod } from '@angular/http';
import { Result } from '../../app/beans/result';
import { Order } from '../../app/beans/order';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
    url: `${environment.apiserver}:8888/order_pay`
})
export class OrderResource extends RestClient {

    @ResourceAction({
        method: RequestMethod.Post,
    })
    postOrder: ResourceMethod<Order, Result>;

}
