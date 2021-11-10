import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliatesComponent } from './containers/affiliates/affiliates.component';

const routes: Routes = [
  { path: '', component: AffiliatesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliatesRoutingModule { }
