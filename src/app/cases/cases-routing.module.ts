import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./cases-list/cases-list.module').then(m => m.CasesListModule),
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    loadChildren: () => import('./create-case/create-case.module').then(m => m.CreateCaseModule),
  },
  {
    path: 'my',
    canActivate: [AuthGuard],
    loadChildren: () => import('./my-cases/my-cases.module').then(m => m.MyCasesModule),
  },
  // {
  //   path: 'daily',
  //   canActivate: [AuthGuard],
  //   component: DailyCaseComponent,
  // },
  {
    path: 'free',
    canActivate: [AuthGuard],
    loadChildren: () => import('./free-box/free-box.module').then(m => m.FreeBoxModule),
  },
  {
    path: 'r/:code',
    loadChildren: () => import('./free-box/free-box.module').then(m => m.FreeBoxModule),
  },
  {
    path: 'unbox/:id',
    loadChildren: () => import('./unboxing/unboxing.module').then(m => m.UnboxingModule),
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./create-case/create-case.module').then(m => m.CreateCaseModule),
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule { }
