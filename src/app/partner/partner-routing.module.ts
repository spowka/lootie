import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnerComponent } from './containers/partner/partner.component';

const routes: Routes = [
  {
    path: '',
    component: PartnerComponent,
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
export class PartnerRoutingModule { }
