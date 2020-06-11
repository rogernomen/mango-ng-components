export interface MngAuthenticationSettings {
  AUTH_TOKEN: string;
  URL: string;
}

export const MNG_AUTHENTICATION_CONSTANTS: MngAuthenticationSettings = {
  AUTH_TOKEN: 'auth_token',
  URL: '/mng-authentication/oauth/token'
};
