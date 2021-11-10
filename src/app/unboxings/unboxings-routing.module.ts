import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  UnboxingsComponent
} from './containers/index';

const routes: Routes = [
  {
    path: '',
    component: UnboxingsComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnboxingsRoutingModule { }
