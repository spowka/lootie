import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiveawayComponent } from './containers/giveaway/giveaway.component';

const routes: Routes = [
  {
    path: '',
    component: GiveawayComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GiveawayRoutingModule { }
