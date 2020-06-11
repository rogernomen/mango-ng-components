import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngc-selectoption-view',
  templateUrl: './ngc-selectoption-view.component.html',
  styleUrls: ['./ngc-selectoption-view.component.scss']
})
export class NgcSelectoptionViewComponent implements OnInit {
  selectedOption1;
  availableOptions1: any = {
    totalUnits: 3,
    top_hist: [
      { shopCountryIso: 'iso1',
      shopDescriptionCountry: 'desc1',
      docCount: 1},
      { shopCountryIso: 'iso2',
      shopDescriptionCountry: 'desc2',
      docCount: 2},
      { shopCountryIso: 'iso3',
      shopDescriptionCountry: 'desc3',
      docCount: 3}
    ]
  };

  
  html = `
  <ngc-selectoption [(ngModel)]="selectedOption1">
      <ngc-selectoption-item *ngFor="let option of availableOptions1.top_hist" 
      [keyText]="option.shopDescriptionCountry">
          <img [src]="'assets/flags/1.png'">
          <a class="c-mngLink">{{option.shopDescriptionCountry}}</a> 
          <span class="country-list__qty"> ({{option.docCount}} unidades)</span>
      </ngc-selectoption-item>  
  </ngc-selectoption>         
  `    

  ts = `
  selectedOption1;
  availableOptions1: any = {
    totalUnits: 3,
    top_hist: [
      { shopCountryIso: 'iso1', shopDescriptionCountry: 'desc1', docCount: 1},
      { shopCountryIso: 'iso2', shopDescriptionCountry: 'desc2', docCount: 2},
      { shopCountryIso: 'iso3', shopDescriptionCountry: 'desc3', docCount: 3}
    ]
  };
  `   

  constructor() { }

  ngOnInit() {
  }
}
