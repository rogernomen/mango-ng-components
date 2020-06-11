import { Injectable } from '@angular/core';

@Injectable()
export class NgcAuthenticationUtilsService {

  constructor() { }

  b64EncodeUnicode(str): string {
    return btoa(
      encodeURIComponent(str)
        .replace(
          /%([0-9A-F]{2})/g,
          function(match, p1) { return String.fromCharCode(parseInt('0x' + p1, 16)); }
        )
    );
  }
}
