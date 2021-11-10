import { NgModule } from '@angular/core';

import { RewardsRoutingModule } from './rewards-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { RewardsComponent } from './containers/rewards/rewards.component';
import { RewardComponent } from './components/reward/reward.component';

@NgModule({
  imports: [
    RewardsRoutingModule,
    SharedModule,
    StoreModule.forFeature('rewards', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    RewardsComponent,
    RewardComponent
  ]
})

export class RewardsModule { }
