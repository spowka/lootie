import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreeBoxComponent } from './free-box/free-box.component';

const routes: Routes = [
  {
    path: '',
    component: FreeBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreeBoxRoutingModule { }
