import {Component, HostListener} from '@angular/core';
import {Subject} from 'rxjs/index';
import {NgcModalService} from '../services/ngc-modal.service';
import {ModalOptions} from '../models/ModalOptions.class';


@Component({
  selector: 'ngc-modal',
  templateUrl: './ngc-modal.component.html'
})
export class NgcModalComponent {
	target: any;
  content: string;
  footer: string;
  defaultModalSizeClasses: string;
  options: ModalOptions;
  modalState$ = {
    close: new Subject()
  };

  @HostListener('click', ['$event.target'])
  clickOutsideModal(target) {
    if (target.querySelector('.c-mngModal__container')) {
		this.closeModal();
	}
  }

  constructor() {
	this.defaultModalSizeClasses = 'col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3';
  }

  closeModal(event?: any) {
	this.modalState$.close.next('Click outside modal');
	NgcModalService.close();
  }
}
