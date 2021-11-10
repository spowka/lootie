import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAvailablePageComponent } from './containers/not-available-page/not-available-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotAvailablePageComponent
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
export class NotAvailableRoutingModule { }
