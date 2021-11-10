import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpgradeInformationComponent } from './containers/upgrade-information/upgrade-information.component';

const routes: Routes = [
  {
    path: '',
    component: UpgradeInformationComponent
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
export class HowItWorksUpgradeRoutingModule { }
