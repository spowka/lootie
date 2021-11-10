import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ChristmasBoxRoutingModule } from './christmas-box-routing.module';

import { ChristmasBoxComponent } from './containers/christmas-box/christmas-box.component';

@NgModule({
  declarations: [
    ChristmasBoxComponent
  ],
  imports: [
    CommonModule,
    // SharedModule,
    ChristmasBoxRoutingModule
  ]
})
export class ChristmasBoxModule { }
