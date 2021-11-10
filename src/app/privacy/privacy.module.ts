import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrivacyRoutingModule
  ]
})
export class PrivacyModule { }
