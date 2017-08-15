import { Injectable } from '@angular/core';
import { RestClient } from 'app/services/rest-client.service';
import { ResourceAction, ResourceMethod, ResourceParams } from 'ngx-resource';
import { RequestMethod } from '@angular/http';
import { Province } from 'app/beans/province';

@Injectable()
@ResourceParams({
    url: '/data'
})
export class DataResource extends RestClient {

    @ResourceAction({
        method: RequestMethod.Get,
        path: '/province-city.json',
        isArray: true,
        requestInterceptor: function (req, methodOptions) {
            return req;
        }
    })
    provinceCity: ResourceMethod<void, Province[]>;
}
