import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotAvailableRoutingModule } from './not-available-routing.module';
import { NotAvailablePageComponent } from './containers/not-available-page/not-available-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotAvailablePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NotAvailableRoutingModule
  ]
})
export class NotAvailableModule { }
