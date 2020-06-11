import { Component } from '@angular/core';

@Component({
  selector: 'ngc-paginator-view',
  templateUrl: './ngc-paginator-view.component.html',
  styleUrls: ['./ngc-paginator-view.component.scss']
})
export class NgcPaginatorViewComponent {
  html = `
  ...                                
  `   
  ts = `
  ...
  `
  totalPages: number;
  actualPage: number;
  ngOnInit() {   
    this.totalPages = 10;
    this.actualPage = 1;  
  }

  onChangePage(event) {
    this.actualPage = event;
  }

  cambiarpag() {
    if(this.totalPages === 10) 
      this.totalPages = 1;
    else this.totalPages = 10;
    this.actualPage = 1;
  }
}
