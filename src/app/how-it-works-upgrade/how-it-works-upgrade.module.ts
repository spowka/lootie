import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HowItWorksUpgradeRoutingModule } from './how-it-works-upgrade-routing.module';
import { UpgradeInformationComponent } from './containers/upgrade-information/upgrade-information.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UpgradeInformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HowItWorksUpgradeRoutingModule
  ]
})
export class HowItWorksUpgradeModule { }
