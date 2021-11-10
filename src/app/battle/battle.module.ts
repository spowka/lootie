import { NgModule } from '@angular/core';
import { BattleRoutingModule } from './battle-routing.module';

import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from '../shared/shared.module';
import { CountUpModule } from 'countup.js-angular2';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  reducers as battleReducers,
  effects as battleEffects,
} from 'src/app/battle/@store';

import {
  BattleComponent,
  BattleListComponent,
  CreateBattleComponent,
  BattleHistoryComponent,
} from './containers';
import {
  BattleHeaderComponent,
  BattleListItemComponent,
  BattleStatusBarComponent,
  BattleWaitingComponent,
  BattleBoxItemComponent,
  BattleBoxComponent,
  BattleSpinnerComponent,
  BattleResultComponent,
  BattleCountdownComponent,
  BattleCaseSliderComponent,
  DialogBoxesComponent,
  DialogWinnerComponent,
  HowToPlayComponent
} from './components';
import {
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatTabsModule,
} from '@angular/material';
import { ProvablyFairModule } from '../provably-fair/provably-fair.module';

@NgModule({
  declarations: [
    BattleListComponent,
    BattleHeaderComponent,
    BattleListItemComponent,
    CreateBattleComponent,
    BattleStatusBarComponent,
    BattleWaitingComponent,
    BattleBoxComponent,
    BattleBoxItemComponent,
    BattleComponent,
    BattleSpinnerComponent,
    BattleResultComponent,
    BattleHistoryComponent,
    BattleCountdownComponent,
    BattleCaseSliderComponent,
    DialogBoxesComponent,
    DialogWinnerComponent,
    HowToPlayComponent
  ],
  entryComponents: [DialogBoxesComponent, DialogWinnerComponent],
  imports: [
    BattleRoutingModule,
    ProvablyFairModule,
    SharedModule,
    ClipboardModule,
    CountUpModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    StoreModule.forFeature('battle', battleReducers),
    EffectsModule.forFeature(battleEffects),
  ],
  providers: [],
})
export class BattleModule {}
