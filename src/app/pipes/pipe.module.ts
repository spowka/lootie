import { NgModule } from '@angular/core';

import { CapitalizeFirstPipe, GroupByPipe, ReplacePipe, SumPipe, SafePipe, ValidateImgPipe } from './index';

@NgModule({
  declarations: [
    CapitalizeFirstPipe,
    GroupByPipe,
    ReplacePipe,
    SumPipe,
    SafePipe,
    ValidateImgPipe,
  ],
  exports: [
    CapitalizeFirstPipe,
    GroupByPipe,
    ReplacePipe,
    SumPipe,
    SafePipe,
    ValidateImgPipe,
  ],
})

export class PipeModule { }
