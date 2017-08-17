import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from '../../../environments/environment';
import {SessionStorageService} from '../../services/session-storage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class VCodeModule {

  constructor(private  session: SessionStorageService) {}

}
