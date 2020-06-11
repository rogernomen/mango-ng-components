import { InjectionToken } from "@angular/core";

export enum NgcAuthenticationServiceTypes {
  'JAM',
  'MNG_AUTHENTICATION'
}

export enum NgcAuthenticationStorageTypes {
  'SESSION',
  'LOCAL'
}

export class NgcAuthenticationConfig {
  authService?: NgcAuthenticationServiceTypes;
  baseUrl: string;
  applicationId: string;
}

export let NGC_AUTHENTICATION_CONFIG = new InjectionToken<NgcAuthenticationConfig>('NGC_AUTHENTICATION_CONFIG');
