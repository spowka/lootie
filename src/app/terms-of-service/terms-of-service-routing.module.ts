import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfServiceComponent } from './containers/terms-of-service/terms-of-service.component';

const routes: Routes = [
  {
    path: '',
    component: TermsOfServiceComponent
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
export class TermsOfServiceRoutingModule { }
