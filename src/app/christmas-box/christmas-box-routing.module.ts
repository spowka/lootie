import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChristmasBoxComponent } from './containers/christmas-box/christmas-box.component';

const routes: Routes = [
  {
    path: '',
    component: ChristmasBoxComponent
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
export class ChristmasBoxRoutingModule { }
