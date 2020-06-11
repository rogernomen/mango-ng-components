import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'ngc-loader-page-view',
  templateUrl: './ngc-loader-page-view.component.html',
  styleUrls: ['./ngc-loader-page-view.component.scss']
})
export class NgcLoaderPageViewComponent implements OnInit {
  showLoader: boolean;
  ts: string;

  ngOnInit(): void {
    this.showLoader = false;
    this.ts = '<ngc-loader-page *ngIf="showLoader"></ngc-loader-page>';
  }

  toggleShowLoader(): void {
    this.showLoader = !this.showLoader;
    setTimeout(() => {
      this.showLoader = !this.showLoader;
    }, 1000);
  }
}
