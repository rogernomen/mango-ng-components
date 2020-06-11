import {TestBed} from '@angular/core/testing';
import {NgcToastHolder} from '../holders/toast.holder';
import {Toast} from '../models/Toast.class';

describe('ToastHolderSpec', () => {
  let toastHolder: NgcToastHolder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgcToastHolder
      ]
    });
    toastHolder = TestBed.get(NgcToastHolder);
  });

  it('should be created', () => {
    expect(toastHolder).toBeTruthy();
  });

  it('shold set toast when it was not previously set', () => {
    const toast = new Toast('id');
    toastHolder.setToast(toast);
    toastHolder.setToast(toast);
    toastHolder.getToastList().subscribe((toastList) => {
      expect(toastList.length).toBe(1);
    });
  });

  it('should remove toast when removeToast method is called', () => {
    const toast = new Toast('id');
    toastHolder.setToast(toast);
    toastHolder.removeToast(toast);

    toastHolder.getToastList().subscribe((toastList) => {
      expect(toastList.length).toBe(0);
    });
  });

});
