export interface AuthenticationModuleConfig {
  AUTH_TOKEN: string;
  JWT: any;
}

export const JWT_AUTHENTICATION_CONSTANTS: AuthenticationModuleConfig = {
  AUTH_TOKEN: 'auth_token',
  JWT: {
    REMOTES: {
      //LOGIN: 'oneapp/jam/oauth/token',
      //LOGIN: 'https://dapplications.mango.com/jam/oauth/token',
      LOGIN: '/jam/oauth/token',
      REFRESH_TOKEN_ENDPOINT: ''
    },
    BODY: {
      GRANT_TYPE: 'password'
    },
    HEADERS: {
      CONTENT_TYPE: 'Content-Type',
      APPLICATION: 'application/x-www-form-urlencoded'
    },
    EXPIRATION_DATE: 'jwtExpirationDate'
  }
};

