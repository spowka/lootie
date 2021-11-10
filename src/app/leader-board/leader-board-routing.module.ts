import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderBoardComponent } from './containers/leader-board/leader-board.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderBoardRoutingModule {}
