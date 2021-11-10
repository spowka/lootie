import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyCaseComponent } from './daily-case/daily-case.component';

const routes: Routes = [
  {
    path: '',
    component: DailyCaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnboxingRoutingModule { }
