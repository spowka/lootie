import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositInformationComponent } from './deposit-information.component';

describe('DepositInformationComponent', () => {
  let component: DepositInformationComponent;
  let fixture: ComponentFixture<DepositInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
