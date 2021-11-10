import { NgModule } from '@angular/core';
import { DragScrollModule } from 'ngx-drag-scroll';

import { SharedModule } from '../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './@store';
import { EffectsModule } from '@ngrx/effects';

import { AccountComponent } from './containers/account/account.component';
import { MatInputModule, MatSelectModule, MatMenuModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';

@NgModule({
  imports: [
    AccountRoutingModule,
    DragScrollModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatButtonToggleModule,
    StoreModule.forFeature('account', reducers),
    EffectsModule.forFeature(effects),
    SharedModule,
  ],
  declarations: [
    AccountComponent,
  ]
})

export class AccountModule { }
