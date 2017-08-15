import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCodeComponent } from './modify-code.component';

describe('ModifyCodeComponent', () => {
  let component: ModifyCodeComponent;
  let fixture: ComponentFixture<ModifyCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
