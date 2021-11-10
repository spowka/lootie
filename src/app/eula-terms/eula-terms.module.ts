import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EulaTermsRoutingModule } from './eula-terms-routing.module';
import { EulaTermsComponent } from './containers/eula-terms/eula-terms.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EulaTermsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EulaTermsRoutingModule
  ]
})
export class EulaTermsModule { }
