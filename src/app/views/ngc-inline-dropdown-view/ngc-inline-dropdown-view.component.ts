import { Component, OnInit } from '@angular/core';
import { DropdownListElement } from 'projects/mango-ng-components/src/lib/ngc-inline-dropdown/components/models/dropdownList.model';

@Component({
  selector: 'app-ngc-inline-dropdown-view',
  templateUrl: './ngc-inline-dropdown-view.component.html',
  styleUrls: ['./ngc-inline-dropdown-view.component.scss']
})
export class NgcInlineDropdownViewComponent implements OnInit {


  dropdownOptionsList: Array<DropdownListElement>;
  selectedOption: string;
  title: string;
  constructor() { }

  ngOnInit() {
    this.selectedOption = 'Producto';
    this.dropdownOptionsList = [{
      label: 'Producto',
      value: 'product'
    }, {
      label: 'Beneficio',
      value: 'revenue'
    }];
    this.title = 'Ordenar per:';
  }

  orderBy(event: string) {
    console.log(event);
  }

}
