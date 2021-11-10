import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

import { AffiliatesRoutingModule } from './affiliates-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { AffiliatesComponent } from './containers/affiliates/affiliates.component';
import { AffiliatesClaimStatsComponent } from './components/affiliates-claim-stats/affiliates-claim-stats.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MatMenuModule, MatExpansionModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  imports: [
    AffiliatesRoutingModule,
    SharedModule,
    ClipboardModule,
    DragScrollModule,
    MatMenuModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    StoreModule.forFeature('affiliates', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    AffiliatesComponent,
    AffiliatesClaimStatsComponent,
  ]
})

export class AffiliatesModule { }
