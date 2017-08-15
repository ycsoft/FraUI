import { TestBed, inject } from '@angular/core/testing';

import { SmallTypeColorService } from './small-type-color.service';

describe('SmallTypeColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmallTypeColorService]
    });
  });

  it('should be created', inject([SmallTypeColorService], (service: SmallTypeColorService) => {
    expect(service).toBeTruthy();
  }));
});
