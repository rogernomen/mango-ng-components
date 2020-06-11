import {TestBed} from '@angular/core/testing';
import {NgcToastService} from './toast.service';
import {NgcToastHolder} from '../holders/toast.holder';
import {NgcToastMockHolder} from '../holders/toast.mock.holder';
import {Toast} from '../models/Toast.class';

describe('ToastService', () => {
  let toastService: NgcToastService;
  let toastHolder: NgcToastHolder;
  let spies;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NgcToastService,
        {provide: NgcToastHolder, useClass: NgcToastMockHolder}

      ]
    });
    toastHolder = TestBed.get(NgcToastHolder);
    toastService = TestBed.get(NgcToastService);

    loadSpies();
  });

  it('should be created', () => {
    expect(toastService).toBeTruthy();
  });

  it('should set toast when setToast method is called', () => {
    const toast = new Toast();
    toastService.setToast(toast);
    expect(spies.toastHolder.setToast).toHaveBeenCalled();
  });

  it('should get toast list when getToastList method is called', () => {
    toastService.getToastList();
    expect(spies.toastHolder.getToastList).toHaveBeenCalled();
  });

  it('should remove toast when removeToast method is called', () => {
    const toast = new Toast();
    toastService.removeToast(toast);
    expect(toastHolder.removeToast).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      toastHolder: {
        setToast: spyOn(toastHolder, 'setToast').and.callThrough(),
        getToastList: spyOn(toastHolder, 'getToastList').and.callThrough(),
        removeToast: spyOn(toastHolder, 'removeToast').and.callThrough()
      }
    };
  }
});
