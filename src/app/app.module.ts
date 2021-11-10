import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// @ngrx
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { effects, metaReducers, reducers } from './@store/index';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/containers/settings/settings.component';
import { MobileHeaderModule } from './mobile-header/mobile-header.module';
import { SentryErrorHandler } from './app.error';

import { CoreModule } from './core/core.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';

import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LazyTranslateLoader } from './shared/utils/translate-loader';
import { DatePipe } from '@angular/common';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

declare global {
  interface Window {
    analytics: any;
    seon: any;
    refreshSessionId: Function;
    uuid: Function;
    getSession: Function;
  }
}
@NgModule({
  declarations: [
    SettingsComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreRouterConnectingModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        useClass: LazyTranslateLoader,
        deps: [HttpClient]
      }
    }),

    // @ngrx
    StoreModule.forRoot(reducers, {
      metaReducers, runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      }
    }),
    EffectsModule.forRoot(effects),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    CoreModule,

    MobileHeaderModule,
    ChatModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    DatePipe,
    {
      provide: ErrorHandler,
      useClass: SentryErrorHandler,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
