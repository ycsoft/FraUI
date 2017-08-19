/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataResource } from '../../app/resources/data.resource';

describe('DataResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataResource]
    });
  });

  it('should ...', inject([DataResource], (service: DataResource) => {
    expect(service).toBeTruthy();
  }));
});
