import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineRoutingModule } from './offline-routing.module';
import { OfflineErrorPageComponent } from './containers/offline-error-page/offline-error-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    OfflineErrorPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OfflineRoutingModule
  ]
})
export class OfflineModule { }
