import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingRefundRoutingModule } from './shipping-refund-routing.module';
import { ShippingRefundPolicyComponent } from './containers/shipping-refund-policy/shipping-refund-policy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShippingRefundPolicyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShippingRefundRoutingModule
  ]
})
export class ShippingRefundModule { }
