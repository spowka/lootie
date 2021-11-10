import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// import { reducers, effects } from './@store';

import { SharedModule } from '../shared/shared.module';
import { UnboxingsRoutingModule } from './unboxings-routing.module';
// import { DragScrollModule } from 'ngx-drag-scroll';

import {
  UnboxingsComponent,
} from './containers/index';

import {
  UnboxingsListComponent,
  UnboxingsInstructionComponent,
  UnboxingItemComponent,
} from './components/index';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    UnboxingsRoutingModule,
    SharedModule,
    MatIconModule,
    // DragScrollModule,
    // StoreModule.forFeature('unboxings', reducers),
    // EffectsModule.forFeature(effects),
  ],
  declarations: [
    UnboxingsComponent,
    UnboxingsListComponent,
    UnboxingsInstructionComponent,
    UnboxingItemComponent,
  ],
})

export class UnboxingsModule { }
