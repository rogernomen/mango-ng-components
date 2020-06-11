import {Component, OnInit} from '@angular/core';
import {DropdownListElement} from '../../../../projects/mango-ng-components/src/lib/ngc-dropdown/ngc-dropdown-list/models/dropdownList.model';

@Component({
  templateUrl: './ngc-dropdown-view.component.html',
  styleUrls: ['./ngc-dropdown-view.component.scss']
})

export class NgcDropdownViewComponent implements OnInit {
  dropdownOptionsList: Array<DropdownListElement>;
  otherDropdownOptionList: Array<DropdownListElement>;
  formDropdownList: Array<DropdownListElement>;
  dropdownConfig: any;
  selectedValue: any;
  formDropdownValue: any;

  ngOnInit(): void {
    this.dropdownOptionsList = [{
      label: 'item1',
      value: 'item1'
    }, {
      label: 'item2',
      value: 'item2'
    }];

    this.otherDropdownOptionList = [{
      label: 'item3',
      value: 'item3'
    }, {
      label: 'item4',
      value: 'item4'
    }];

    this.formDropdownList = [{
      label: 'item5',
      value: 'item5'
    }, {
      label: 'item6',
      value: 'item6'
    }];

    this.dropdownConfig = {
      hasSearchIcon: false,
      placeholder: 'Selecciona una opción',
      disabled: false
    };

    this.formDropdownValue = 'item6';
  }

  onSelectValue(selectedValue: DropdownListElement): void {
    console.log('on selecect dropdown value', selectedValue);
  }

  changeformDropdownValue() {
    this.formDropdownValue = null;
  }
}
