import {Observable, of} from 'rxjs/index';
export class DropdownMockService {
  getCurrentValue(): Observable<any> {
    return of({});
  }

  registerDropdown() { return of({}); }

  setSelectedValue(): void {}
}
