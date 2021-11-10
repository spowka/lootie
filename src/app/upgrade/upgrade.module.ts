import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpgradeRoutingModule } from './upgrade-routing.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { SharedModule } from '../shared/shared.module';
import { DragScrollModule } from 'ngx-drag-scroll';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { UpgradeComponent } from './containers/upgrade/upgrade.component';
import {
  DialogInventoryComponent,
  DialogSiteItemsComponent,
  LatestUpgradesComponent,
  DialogGameRulesComponent,
} from './components/index';
import { LatestUpgradesTogglerComponent } from './components/latest-upgrades-toggler/latest-upgrades-toggler.component';
import {
  MatIconModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    UpgradeRoutingModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    SharedModule,
    DragScrollModule,
    StoreModule.forFeature('upgrade', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    UpgradeComponent,
    DialogSiteItemsComponent,
    DialogInventoryComponent,
    DialogGameRulesComponent,
    LatestUpgradesComponent,
    LatestUpgradesTogglerComponent,
  ],
  entryComponents: [
    DialogSiteItemsComponent,
    DialogInventoryComponent,
    DialogGameRulesComponent,
  ],
})
export class UpgradeModule {}
