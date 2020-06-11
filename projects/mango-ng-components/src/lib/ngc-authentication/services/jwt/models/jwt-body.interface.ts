export interface JwtBody {
  grant_type: string;
  client_id: string;
  unique_id: string;
  username: string;
  password: string;
}
