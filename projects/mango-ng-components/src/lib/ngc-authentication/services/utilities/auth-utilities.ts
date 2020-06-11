export class AuthUtilities  {

  public static setSessionStorageKey(key: string, value: any): any {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
  }

  public static getSessionStorageKey(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  public static setLocalStorageKey(key: string, value: any): any {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  public static getLocalStorageKey(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }
}
