import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';

import { SharedModule } from '../shared/shared.module';
import { ProvablyFairRoutingModule } from './provably-fair-routing.module';

import { ProvablyFairComponent } from './containers/provably-fair/provably-fair.component';
import { DialogLookupComponent } from './components/dialog-lookup/dialog-lookup.component';
import {
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  imports: [
    ProvablyFairRoutingModule,
    SharedModule,
    ClipboardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ProvablyFairComponent,
    DialogLookupComponent,
  ],
  entryComponents: [
    DialogLookupComponent,
  ]
})
export class ProvablyFairModule { }
