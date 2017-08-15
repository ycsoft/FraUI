import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayPopComponent } from './pay-pop.component';

describe('PayPopComponent', () => {
  let component: PayPopComponent;
  let fixture: ComponentFixture<PayPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
