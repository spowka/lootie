import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { SupportComponent } from './containers/support/support.component';
import { SharedModule } from '../shared/shared.module';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  declarations: [
    SupportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatExpansionModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
