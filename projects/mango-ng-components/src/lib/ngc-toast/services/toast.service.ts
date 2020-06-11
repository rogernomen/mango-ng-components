import {Injectable} from '@angular/core';
import {Toast} from '../models/Toast.class';
import {NgcToastHolder} from '../holders/toast.holder';
import {Observable} from 'rxjs/index';

@Injectable()

export class NgcToastService {
  constructor(private toastHolder: NgcToastHolder) {}

  setToast = (toast: Toast): void => {
    this.toastHolder.setToast(toast);
  }

  getToastList = (): Observable<Array<Toast>> => {
    return this.toastHolder.getToastList();
  }

  removeToast = (toast: Toast): void => {
    this.toastHolder.removeToast(toast);
  }
}
