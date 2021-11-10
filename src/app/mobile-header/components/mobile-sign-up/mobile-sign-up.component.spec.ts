import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSignUpComponent } from './mobile-sign-up.component';

describe('MobileSignUpComponent', () => {
  let component: MobileSignUpComponent;
  let fixture: ComponentFixture<MobileSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
