import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingRefundPolicyComponent } from './shipping-refund-policy.component';

describe('ShippingRefundPolicyComponent', () => {
  let component: ShippingRefundPolicyComponent;
  let fixture: ComponentFixture<ShippingRefundPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingRefundPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingRefundPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
