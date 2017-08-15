import { Injectable } from '@angular/core';
import { ResourceParams, Resource, ResourceAction, ResourceMethod } from 'ngx-resource';
import { Result } from '../../app/beans/result';
import { RestClient } from '../../app/services/rest-client.service';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
  url:  `${environment.server1}:8888/search`
})
export class SearchResource extends RestClient {

  @ResourceAction({
    path: '/?keywords={!keywords}'
  })
  search: ResourceMethod<{ keywords: any }, Result>;
}
