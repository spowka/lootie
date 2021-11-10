import { NgModule } from '@angular/core';

import { HistoryRoutingModule } from './history-routing.module';
import { SharedModule } from '../shared/shared.module';

import { HistoryComponent } from './containers/history/history.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { MysteryBattleHistoryComponent } from './components/mystery-battle-history/mystery-battle-history.component';

import {
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
    HistoryRoutingModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  declarations: [
    HistoryComponent,
    OrderHistoryComponent,
    TransactionsHistoryComponent,
    MysteryBattleHistoryComponent,
  ],
})
export class HistoryModule {}
