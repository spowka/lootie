import { NgModule } from '@angular/core';
import { DragScrollModule } from 'ngx-drag-scroll';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './@store';

import {
  WithdrawComponent,
  GroupPropertyPipe,
  SafeHtmlPipe,
} from './containers/withdraw/withdraw.component';
import { DialogWithdrawAddItemsComponent } from './components/dialog-withdraw-add-items/dialog-withdraw-add-items.component';
import {
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatStepperModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
  imports: [
    WithdrawRoutingModule,
    SharedModule,
    DragScrollModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    MatStepperModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('withdraw', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    WithdrawComponent,
    DialogWithdrawAddItemsComponent,
    GroupPropertyPipe,
    SafeHtmlPipe,
  ],
  entryComponents: [DialogWithdrawAddItemsComponent],
})
export class WithdrawModule {}
