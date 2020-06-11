

import { Component, OnInit } from '@angular/core';
import { NgcToastService } from 'projects/mango-ng-components/src/lib/ngc-toast/services/toast.service';
import { Toast } from 'projects/mango-ng-components/src/lib/ngc-toast/models/Toast.class';

@Component({
  selector: 'app-ngc-toast-view',
  templateUrl: './ngc-toast-view.component.html',
  styleUrls: ['./ngc-toast-view.component.scss']
})

export class NgcToastViewComponent implements OnInit {
  ts: string;
  html: string;
  isMobile: boolean;

  constructor(private toastService: NgcToastService) {
    this.ts = `  ngOnInit() {
        this.isMobile = this.isMobileDevice();
        this.toastService.setToast(new Toast('newConsumer', 'TOAST TEXT'));
      }
    
      private isMobileDevice(): boolean {
        return window && window.innerWidth < 768;
      }`;
    this.html = ` <ngc-toast [isMobile]="isMobile"></ngc-toast> `;
    }

  ngOnInit() {
    this.isMobile = this.isMobileDevice();
    this.toastService.setToast(new Toast('newConsumer'));
  }

  private isMobileDevice(): boolean {
    return window && window.innerWidth < 768;
  }
}
