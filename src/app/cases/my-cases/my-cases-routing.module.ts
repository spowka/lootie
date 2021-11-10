import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCasesComponent } from './my-cases/my-cases.component';

const routes: Routes = [
  {
    path: '',
    component: MyCasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyCasesRoutingModule { }
