import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { TermsOfServiceRoutingModule } from './terms-of-service-routing.module';
import { TermsOfServiceComponent } from './containers/terms-of-service/terms-of-service.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TermsOfServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TermsOfServiceRoutingModule,
    MatButtonModule
  ]
})
export class TermsOfServiceModule { }
