import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';

import { SteamReturnComponent } from './components/steam-return/steam-return.component';
import { OpskinsReturnComponent } from './components/opskins-return/opskins-return.component';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './@store';
import { EffectsModule } from '@ngrx/effects';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleClientId)
      }
    ]
  );
  return config;
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SocialLoginModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    SteamReturnComponent,
    OpskinsReturnComponent,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() core: AuthModule) {
    if (core) {
      throw new Error('Auth module Error');
    }
  }
}
