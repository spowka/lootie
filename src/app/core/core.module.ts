import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShareButtonModule } from '@ngx-share/button';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { NgxZendeskWebwidgetModule } from 'ngx-zendesk-webwidget';
import { ZendeskConfig } from './configs/zendesk.config';
import { CountUpModule } from 'countup.js-angular2';

import { InterceptService } from './interceptors/intercept.service';
import { SocketService } from './socket/services/socket.service';

import {
  HeaderComponent,
  FooterComponent,
  MobileFooterComponent,
  NotificationsComponent,
  SignUpDialogComponent,
  LoginDialogComponent,
  ForgotPasswordDialogComponent,
  AuthDialogComponent
} from './components/index';

import { PageNotFoundComponent } from './containers/index';
import {
  MatIconModule,
  MatMenuModule,
  MatButtonToggleModule,
  MatInputModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatButtonModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import {LoaderRoutingBarComponent} from './components/loader-routing-bar/loader-routing-bar.component';

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    ShareButtonModule.forRoot(),
    NgxZendeskWebwidgetModule.forRoot(ZendeskConfig),
    ToastrModule.forRoot({
      timeOut: 6000,
      //disableTimeOut: true, // for development; prevents hide animation
      enableHtml: true,
      positionClass: 'toast-top-right-customize',
      toastClass: 'toast-custom',
      iconClasses: {
        error: 'toast-error-custom',
        info: 'toast-info-custom',
        success: 'toast-success-custom',
        warning: 'toast-default-custom' // warning - equals to default state
      },
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      toastComponent: NotificationsComponent
    }),
    CountUpModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileFooterComponent,
    NotificationsComponent,
    SignUpDialogComponent,
    LoginDialogComponent,
    AuthDialogComponent,
    ForgotPasswordDialogComponent,
    PageNotFoundComponent,
    LoaderRoutingBarComponent,
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    SocketService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MobileFooterComponent,
    NotificationsComponent,
    LoaderRoutingBarComponent,
  ],
  entryComponents: [
    NotificationsComponent,
    LoginDialogComponent,
    AuthDialogComponent,
    SignUpDialogComponent,
    ForgotPasswordDialogComponent
  ]
})
export class CoreModule { }
