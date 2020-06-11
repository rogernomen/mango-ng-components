
export class LoginFormValues {

  private _username: string;
  private _password: string;
  private _saveSession: boolean;

  constructor(username?: string, password?: string, saveSession?: boolean) {
    this._username = username;
    this._password = password;
    this._saveSession = saveSession;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get saveSession(): boolean {
    return this._saveSession;
  }

  set saveSession(value: boolean) {
    this._saveSession = value;
  }
}
