import {JwtBody} from './jwt-body.interface';

export class JwtBodyImp implements JwtBody {

  client_id: string;
  grant_type: string;
  unique_id: string;
  username: string;
  password: string;

  constructor(client_id?: string, grant_type?: string, unique_id?: string, username?: string, password?: string) {
    this.client_id = client_id;
    this.grant_type = grant_type;
    this.unique_id = unique_id;
    this.username = username;
    this.password = password;
  }
}
