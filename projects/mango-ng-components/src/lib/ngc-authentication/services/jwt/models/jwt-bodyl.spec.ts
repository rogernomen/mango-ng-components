import {JwtBodyImp} from './jwt-body.class';

describe('JWTBody', () => {
  let mocks;

  beforeEach(() => {
    loadMocks();
  });

  it('should set and get properties', () => {
    const jwtBody = new JwtBodyImp();
    jwtBody.client_id = mocks.client_id;
    jwtBody.grant_type = mocks.grant_type;
    jwtBody.unique_id = mocks.unique_id;
    jwtBody.username = mocks.username;
    jwtBody.password = mocks.password;

    expect(jwtBody.client_id).toEqual(mocks.client_id);
    expect(jwtBody.grant_type).toEqual(mocks.grant_type);
    expect(jwtBody.unique_id).toEqual(mocks.unique_id);
    expect(jwtBody.username).toEqual(mocks.username);
    expect(jwtBody.password).toEqual(mocks.password);
  });

  function loadMocks() {
    mocks = {
      grant_type: 'test',
      client_id: 'test',
      unique_id: 'test',
      username: 'test',
      password: 'test'
    };
  }
});
