/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RestClient } from 'app/services/rest-client.service';

describe('RestClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestClient]
    });
  });

  it('should ...', inject([RestClient], (service: RestClient) => {
    expect(service).toBeTruthy();
  }));
});
