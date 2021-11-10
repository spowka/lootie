import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EulaTermsComponent } from './containers/eula-terms/eula-terms.component';

const routes: Routes = [
  {
    path: '',
    component: EulaTermsComponent
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
export class EulaTermsRoutingModule { }
