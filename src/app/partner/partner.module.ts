import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './containers/partner/partner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PartnerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    PartnerRoutingModule
  ]
})
export class PartnerModule { }
