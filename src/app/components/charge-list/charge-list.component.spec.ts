import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeListComponent } from './charge-list.component';

describe('ChargeListComponent', () => {
  let component: ChargeListComponent;
  let fixture: ComponentFixture<ChargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
