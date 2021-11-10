import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoryComponent } from './containers/history/history.component';

import {
  DepositsComponent,
  UnboxingsComponent,
  UpgradesComponent,
  WithdrawalsComponent,
} from '../shared/components/index';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { MysteryBattleHistoryComponent } from './components/mystery-battle-history/mystery-battle-history.component';

const routes: Routes = [
  {
    path: '',
    component: HistoryComponent,
    children: [
      {
        path: 'deposits',
        component: DepositsComponent,
      },
      {
        path: 'unboxings',
        component: UnboxingsComponent
      },
      {
        path: 'upgrades',
        component: UpgradesComponent
      },
      {
        path: 'withdrawals',
        component: WithdrawalsComponent
      },
      {
        path: 'order',
        component: OrderHistoryComponent
      },
      {
        path: 'transactions',
        component: TransactionsHistoryComponent
      },
      {
        path: 'mystery-battles',
        component: MysteryBattleHistoryComponent
      },
      {
        path: '',
        redirectTo: 'unboxings',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
