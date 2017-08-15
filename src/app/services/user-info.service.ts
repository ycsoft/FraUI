import { Injectable } from '@angular/core';

@Injectable()
export class UserInfoService {
  public isLogin = false;
  public userName = '';
  constructor() { }
}
