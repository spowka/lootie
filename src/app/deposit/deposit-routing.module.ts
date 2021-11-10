import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositComponent } from './containers/deposit/deposit.component';

const routes: Routes = [
  { path: '', component: DepositComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DepositRoutingModule { }
