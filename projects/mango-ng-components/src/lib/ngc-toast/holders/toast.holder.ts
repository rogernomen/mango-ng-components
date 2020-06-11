import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {Toast} from '../models/Toast.class';
import * as _ from 'lodash';

@Injectable()

export class NgcToastHolder {
  toastList: Array<Toast>;
  toastList$: BehaviorSubject<Array<Toast>> = new BehaviorSubject([]);

  constructor() {
    this.toastList = [];
  }

  setToast = (toast: Toast): void => {
    if (!_.find(this.toastList, (toastItem: Toast) => toastItem.id === toast.id)) {
      this.toastList.push(toast);
      this.toastList$.next(this.toastList);
    }
  }

  getToastList = (): Observable<Array<Toast>> => {
    return this.toastList$.asObservable();
  }

  removeToast = (toast: Toast): void => {
    _.remove(this.toastList, (toastItem: Toast) => toastItem.id === toast.id);
    this.toastList$.next(this.toastList);
  }
}
