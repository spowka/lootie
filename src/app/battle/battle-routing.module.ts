import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

import {
  CreateBattleComponent,
  BattleListComponent,
  BattleComponent,
  BattleHistoryComponent
} from './containers';
import { BattleWaitingComponent, HowToPlayComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: BattleListComponent
  },
  {
    path: 'finished',
    component: BattleHistoryComponent
  },
  {
    path: 'mine',
    component: BattleHistoryComponent
  },
  {
    path: 'how-to-play',
    component: HowToPlayComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateBattleComponent
  },
  {
    path: 'pending/:id',
    canActivate: [AuthGuard],
    component: BattleWaitingComponent
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: BattleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BattleRoutingModule {}
