import { NgModule, ModuleWithProviders, Optional, SkipSelf, InjectionToken, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { JwtAuthenticationRemote } from './services/jwt/jwt-authentication.remote';
import { JwtAuthenticationService } from './services/jwt/jwt-authentication.service';
import { MngAuthenticationRemote } from './services/mng-authentication/mng-authentication.remote';
import { MngAuthenticationService } from './services/mng-authentication/mng-authentication.service';
import { NgcAuthenticationService } from './services/ngc-authentication.service';
import { NgcAuthenticationInterceptor } from './services/ngc-authentication.interceptor';
import { NgcAuthenticationConfig, NgcAuthenticationServiceTypes, NGC_AUTHENTICATION_CONFIG } from './models/ngc-authentication-config.model';
import { NgcAuthenticationUtilsService } from './services/utilities/ngc-authentication-utils.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: []
})
export class NgcAuthenticationModule {
  constructor (@Optional() @SkipSelf() parentModule: NgcAuthenticationModule) {
    if (parentModule) {
      throw new Error(
        'NgcAuthenticationModule is already loaded. Import it in the AppModule only');
    }
  }
  public static forRoot(config: NgcAuthenticationConfig): ModuleWithProviders {
    return {
      ngModule: NgcAuthenticationModule,
      providers: [
        JwtAuthenticationService,
        JwtAuthenticationRemote,
        MngAuthenticationRemote,
        MngAuthenticationService,
        {provide: NGC_AUTHENTICATION_CONFIG, useValue : config },
        {provide: NgcAuthenticationService,
          useFactory: getAuthenticationService,
          deps: [ JwtAuthenticationRemote,
                  MngAuthenticationRemote,
                  NGC_AUTHENTICATION_CONFIG
                ]
        },
        NgcAuthenticationInterceptor,
        NgcAuthenticationUtilsService
      ]};
  }
}

export function getAuthenticationService(
  jwtAuthenticationRemote: JwtAuthenticationRemote,
  mngAuthenticationRemote: MngAuthenticationRemote,
  config: NgcAuthenticationConfig
) {
  switch (config.authService) {
    case NgcAuthenticationServiceTypes.JAM:
      return new JwtAuthenticationService(jwtAuthenticationRemote, config);
    case NgcAuthenticationServiceTypes.MNG_AUTHENTICATION:
      return new MngAuthenticationService(mngAuthenticationRemote, config);
    default:
      return new MngAuthenticationService(mngAuthenticationRemote, config);
  }
}

