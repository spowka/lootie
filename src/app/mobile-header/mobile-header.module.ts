import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareButtonModule } from '@ngx-share/button';

import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared/shared.module';

import { MobileHeaderComponent } from './mobile-header.component';
import { MobileMenuComponent } from './containers/mobile-menu/mobile-menu.component';

import {
  MobileLoginComponent,
  MobileLogoffComponent,
  MobileNavigationComponent,
  MobileSignUpComponent,
  MobileForgotPasswordComponent,
} from './components';
import { MobileNavigationItemComponent } from './components/mobile-navigation-item/mobile-navigation-item.component';
import {
  MatInputModule,
  MatCheckboxModule,
  MatButtonToggleModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';

@NgModule({
  declarations: [
    MobileHeaderComponent,
    MobileMenuComponent,
    MobileLoginComponent,
    MobileLogoffComponent,
    MobileNavigationComponent,
    MobileNavigationItemComponent,
    MobileSignUpComponent,
    MobileForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    ShareButtonModule.forRoot(),
    PipeModule,
    SharedModule,
  ],
  exports: [
    MobileHeaderComponent,
  ],
  entryComponents: [
    MobileMenuComponent,
    MobileLoginComponent,
    MobileSignUpComponent,
    MobileForgotPasswordComponent,
    MobileNavigationComponent,
  ]
})
export class MobileHeaderModule { }
