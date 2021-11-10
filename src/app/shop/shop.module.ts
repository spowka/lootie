import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';
import { reducers, effects } from './@store';

import { ShopListComponent } from './containers/shop-list/shop-list.component';
import { ShopFilterComponent } from './components/shop-filter/shop-filter.component';
import { ShopItemComponent } from './components/shop-item/shop-item.component';
import { ShopFilterSidebarComponent } from './components/shop-filter-sidebar/shop-filter-sidebar.component';
import { ShopFilterHeaderComponent } from './components/shop-filter-header/shop-filter-header.component';
import {
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatCheckboxModule,
} from '@angular/material';

@NgModule({
  declarations: [
    ShopListComponent,
    ShopFilterComponent,
    ShopItemComponent,
    ShopFilterSidebarComponent,
    ShopFilterHeaderComponent,
  ],
  imports: [
    ShopRoutingModule,
    SharedModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('shop', reducers),
    EffectsModule.forFeature(effects),
  ],
})
export class ShopModule {}
