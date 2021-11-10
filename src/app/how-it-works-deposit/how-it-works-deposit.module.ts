import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { HowItWorksDepositRoutingModule } from './how-it-works-deposit-routing.module';
import { DepositInformationComponent } from './containers/deposit-information/deposit-information.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DepositInformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    HowItWorksDepositRoutingModule
  ]
})
export class HowItWorksDepositModule { }
