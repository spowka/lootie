import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { InventoryComponent } from './containers/inventory/inventory.component';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    InventoryRoutingModule,
    SharedModule,
    StoreModule.forFeature('inventory', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [InventoryComponent]
})

export class InventoryModule { }
