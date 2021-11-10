import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { FreeBoxRoutingModule } from './free-box-routing.module';

import { FreeBoxComponent } from './free-box/free-box.component';

@NgModule({
  declarations: [
    FreeBoxComponent
  ],
  imports: [
    CommonModule,
    FreeBoxRoutingModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    SharedModule
  ]
})
export class FreeBoxModule { }
