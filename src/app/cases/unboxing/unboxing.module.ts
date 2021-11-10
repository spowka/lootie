import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { UnboxingRoutingModule } from './unboxing-routing.module';

import { DailyCaseComponent } from './daily-case/daily-case.component';
import { SpinnerItemComponent } from './spinner-item/spinner-item.component';
import { DialogItemDescriptionComponent } from './dialog-item-description/dialog-item-description.component';

@NgModule({
  declarations: [
    DailyCaseComponent,
    SpinnerItemComponent,
    DialogItemDescriptionComponent
  ],
  entryComponents: [DialogItemDescriptionComponent],
  imports: [
    CommonModule,
    UnboxingRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class UnboxingModule { }
