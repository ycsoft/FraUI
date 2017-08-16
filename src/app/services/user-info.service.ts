import {Injectable} from '@angular/core';

@Injectable()
export class UserInfoService {
  public user_id: string;
  public isLogin: boolean;
  public pwd: string;
  public vcode: string;
  public sessionid: string;

  constructor() {
  }



}
