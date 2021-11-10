import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatSliderModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { DragScrollModule } from 'ngx-drag-scroll';

import { SharedModule } from '../../shared/shared.module';
import { CreateCaseRoutingModule } from './create-case-routing.module';

import { CreateCaseComponent } from './create-case/create-case.component';
import { OddsTableComponent } from './odds-table/odds-table.component';

@NgModule({
  declarations: [
    CreateCaseComponent,
    OddsTableComponent
  ],
  imports: [
    CommonModule,
    CreateCaseRoutingModule,
    DragScrollModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    SharedModule,
  ]
})
export class CreateCaseModule { }
