import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvablyFairComponent } from './containers/provably-fair/provably-fair.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

import {
  UnboxingsComponent,
  UpgradesComponent,
} from '../shared/components/index';

const routes: Routes = [
  {
    path: '',
    component: ProvablyFairComponent,
    children: [
      {
        path: 'unboxings',
        component: UnboxingsComponent
      },
      {
        path: 'upgrades',
        component: UpgradesComponent
      },
      {
        path: '',
        redirectTo: 'unboxings',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: ':id',
  //   component: ProvablyFairComponent,
  //   children: [
  //     {
  //       path: 'unboxings',
  //       component: UnboxingsComponent
  //     },
  //     {
  //       path: 'upgrades',
  //       component: UpgradesComponent
  //     },
  //     {
  //       path: '',
  //       redirectTo: 'unboxings',
  //       pathMatch: 'full'
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvablyFairRoutingModule { }
