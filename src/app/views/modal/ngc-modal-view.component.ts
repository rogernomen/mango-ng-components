import {Component, OnInit} from '@angular/core';
import {NgcModalService} from '../../../../projects/mango-ng-components/src/lib/ngc-modal/services/ngc-modal.service';
import {ModalContentComponent} from './parts/content/modal-content.component';
import {ModalFooterComponent} from './parts/footer/modal-footer.component';
import {ModalHeaderComponent} from './parts/header/modal-header.component';
import {ModalOptions} from '../../../../projects/mango-ng-components/src/lib/ngc-modal/models/ModalOptions.class';
@Component({
  selector: 'app-ngc-modal',
  templateUrl: './ngc-modal-view.component.html',
  styleUrls: ['./ngc-modal-view.component.scss']
})
export class NgcModalViewComponent implements OnInit {
  modal: any;
  contentComponentCode: string;
  subscribeCode: string;

  constructor(private modalService: NgcModalService) {}

  ngOnInit() {
    this.contentComponentCode = '<span><b>Content Component .ts<b></span> <br /><br />' +
      'import {Component} from \'@angular/core\';  <br />' +
    '@Component({ <br />' +
      '&nbsp; &nbsp; &nbsp; &nbsp; selector: \'modal-content\', <br />' +
      '&nbsp; &nbsp; &nbsp; &nbsp; template: \'&lt;div&gt;&lt;p class="text">{{text}}&lt;/p&gt; &lt;/div&gt;&lt;div&gt;&lt;button (click)="close(\'close modal\')"&gt;Close Modal&lt;/button&gt; &lt;/div&gt;\', <br />' +
      '&nbsp; &nbsp; &nbsp; &nbsp; styleUrls: [\'./modal-content.component.scss\'] <br />' +
      '}); <br /> <br />' +

    'export class ModalContentComponent { <br />' +
      '&nbsp; &nbsp; &nbsp; &nbsp; text = \'Content text\'; <br />' +
    '}';

    this.subscribeCode = 'modalInstance.modalState$.close.subscribe((value) => { <br />' +
    '&nbsp; &nbsp; &nbsp; &nbsp; alert(\'closes with \' + value); <br />' +
    ' }); ';
  }

  openModal() {
    const modalOptions: ModalOptions = {
      title: 'Title',
      isFullScreen: false,
      sizeClasses: 'col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'
    };

    const modalInstance = this.modalService.open(ModalContentComponent, ModalFooterComponent, modalOptions);

    modalInstance.modalState$.close.subscribe((value) => {
      alert('closes with ' + value);
    });
  }

  openBackgroundModal() {
    const modalOptions: ModalOptions = {
      title: 'Title',
      isFullScreen: false,
      sizeClasses: 'col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3',
      backgroundImage: './assets/img/modal-background.png'
    };

    const modalInstance = this.modalService.open(ModalContentComponent, ModalFooterComponent, modalOptions);

    modalInstance.modalState$.close.subscribe((value) => {
      alert('closes with ' + value);
    });
  }
}
