import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiveawayRoutingModule } from './giveaway-routing.module';
import { GiveawayComponent } from './containers/giveaway/giveaway.component';

@NgModule({
  declarations: [
    GiveawayComponent
  ],
  imports: [
    CommonModule,
    GiveawayRoutingModule
  ]
})
export class GiveawayModule { }
