import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { CasesRoutingModule } from './cases-routing.module';

@NgModule({
  imports: [
    StoreModule.forFeature('cases', reducers),
    EffectsModule.forFeature(effects),
    CasesRoutingModule
  ]
})

export class CasesModule { }
