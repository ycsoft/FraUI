/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchResource } from 'app/resources/search.resource';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchResource]
    });
  });

  it('should ...', inject([SearchResource], (service: SearchResource) => {
    expect(service).toBeTruthy();
  }));
});
