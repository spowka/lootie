import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfflineErrorPageComponent } from './containers/offline-error-page/offline-error-page.component';

const routes: Routes = [
  {
    path: '',
    component: OfflineErrorPageComponent
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
export class OfflineRoutingModule { }
