import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepositInformationComponent } from './containers/deposit-information/deposit-information.component';

const routes: Routes = [
  {
    path: '',
    component: DepositInformationComponent
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
export class HowItWorksDepositRoutingModule { }
