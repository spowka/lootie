import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { DragScrollModule } from 'ngx-drag-scroll';

import { SharedModule } from '../../shared/shared.module';
import { MyCasesRoutingModule } from './my-cases-routing.module';

import { MyCasesComponent } from './my-cases/my-cases.component';

@NgModule({
  declarations: [
    MyCasesComponent
  ],
  imports: [
    CommonModule,
    DragScrollModule,
    MyCasesRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class MyCasesModule { }
