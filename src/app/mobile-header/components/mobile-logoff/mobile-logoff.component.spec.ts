import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileLogoffComponent } from './mobile-logoff.component';

describe('MobileLogoffComponent', () => {
  let component: MobileLogoffComponent;
  let fixture: ComponentFixture<MobileLogoffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileLogoffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileLogoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
