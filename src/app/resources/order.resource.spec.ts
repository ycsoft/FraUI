/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderResource } from '../../app/resources/order.resource';

describe('OrderResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderResource]
    });
  });

  it('should ...', inject([OrderResource], (service: OrderResource) => {
    expect(service).toBeTruthy();
  }));
});
