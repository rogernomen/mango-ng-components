import {BehaviorSubject, Observable} from 'rxjs/index';
import {DropdownListElement} from '../ngc-dropdown-list/models/dropdownList.model';

export class DropdownService {
  currentValue: DropdownListElement;
  currentVale$: BehaviorSubject<any> = new BehaviorSubject(null);

  getCurrentValue(): Observable<any> {
    return this.currentVale$.asObservable();
  }

  setSelectedValue(value: DropdownListElement): void {
    this.currentValue = value;
    this.currentVale$.next(this.currentValue);
  }
}
