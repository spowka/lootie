import { DepositRoutingModule } from './deposit-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import { DepositComponent } from './containers/deposit/deposit.component';

import { DepositDialogComponent } from './components';
import { NgModule } from '@angular/core';
import { DepositInstructionComponent } from './components/deposit-instruction/deposit-instruction.component';
import { MatIconModule, MatRadioModule, MatExpansionModule, MatButtonModule, MatProgressSpinnerModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    DepositRoutingModule,
    MatIconModule,
    MatRadioModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SharedModule,
    StoreModule.forFeature('deposit', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [DepositComponent, DepositDialogComponent, DepositInstructionComponent],
  entryComponents: [DepositDialogComponent]
})

export class DepositModule { }
