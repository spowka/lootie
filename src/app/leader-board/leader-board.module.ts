import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LeaderBoardRoutingModule } from './leader-board-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { LeaderBoardComponent } from './containers/leader-board/leader-board.component';
import { LeadersBoardInfoComponent } from './components/leaders-board-info/leaders-board-info.component';
import { LeadersListComponent } from './components/leaders-list/leaders-list.component';
import { LeaderItemComponent } from './components/leader-item/leader-item.component';
import { LeadersWinsComponent } from './components/leaders-wins/leaders-wins.component';

@NgModule({
  imports: [
    LeaderBoardRoutingModule,
    SharedModule,
    StoreModule.forFeature('leaderBoard', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    LeaderBoardComponent,
    LeadersBoardInfoComponent,
    LeadersListComponent,
    LeaderItemComponent,
    LeadersWinsComponent
  ],
})
export class LeaderBoardModule {}
