import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingRefundPolicyComponent } from './containers/shipping-refund-policy/shipping-refund-policy.component';

const routes: Routes = [
  {
    path: '',
    component: ShippingRefundPolicyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ShippingRefundRoutingModule { }
