import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSliderModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { CasesListRoutingModule } from './cases-list-routing.module';

import { CasesComponent } from './cases/cases.component';
import { CasesListComponent } from './cases-list/cases-list.component';
import { DialogUnboxComponent } from './dialog-unbox/dialog-unbox.component';

@NgModule({
  declarations: [
    CasesComponent,
    CasesListComponent,
    DialogUnboxComponent
  ],
  entryComponents: [DialogUnboxComponent],
  imports: [
    CommonModule,
    CasesListRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    SharedModule,
  ]
})
export class CasesListModule { }
