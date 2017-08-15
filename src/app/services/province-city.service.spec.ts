/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProvinceCityService } from './province-city.service';

describe('ProvinceCityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProvinceCityService]
    });
  });

  it('should ...', inject([ProvinceCityService], (service: ProvinceCityService) => {
    expect(service).toBeTruthy();
  }));
});
