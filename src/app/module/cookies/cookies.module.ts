import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class CookiesModule {
  constructor() {}
  getCode() {
    console.log('get code from my site');
  }
}
