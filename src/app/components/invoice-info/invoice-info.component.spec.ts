import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceInfoComponent } from './invoice-info.component';

describe('InvoiceInfoComponent', () => {
  let component: InvoiceInfoComponent;
  let fixture: ComponentFixture<InvoiceInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
