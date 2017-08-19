import { Injectable } from '@angular/core';
import { ResourceParams, Resource, ResourceAction  } from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import { Result } from '../../app/beans/result';
import { RestClient } from '../../app/services/rest-client.service';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
  url:  `${environment.server1}:8888/search`
})
export class SearchResource extends RestClient {

  @ResourceAction({
    path: '/?keywords={!keywords}&user={!user}&token={!token}'
  })
  search: ResourceMethod<{ keywords: any, user: any, token: any }, Result>;
}
