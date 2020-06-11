export interface Authentication {
  authorities: string [];
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  token: string;
  token_type: string;
  user: string;
}
