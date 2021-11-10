import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileForgotPasswordComponent } from './mobile-forgot-password.component';

describe('MobileLoginComponent', () => {
  let component: MobileForgotPasswordComponent;
  let fixture: ComponentFixture<MobileForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
