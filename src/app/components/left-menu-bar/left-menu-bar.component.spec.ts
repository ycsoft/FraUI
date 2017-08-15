import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftMenuBarComponent } from './left-menu-bar.component';

describe('LeftMenuBarComponent', () => {
  let component: LeftMenuBarComponent;
  let fixture: ComponentFixture<LeftMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
