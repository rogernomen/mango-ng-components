import {Component, Input, OnInit} from '@angular/core';
import {DropdownListElement} from '../models/dropdownList.model';
import {DropdownService} from '../../services/dropdown.service';

@Component({
  selector: 'ngc-dropdown-list',
  templateUrl: './ngc-dropdown-list.component.html',
  styleUrls: ['./ngc-dropdown-list.component.scss']
})

export class NgcDropDownListComponent implements OnInit {
  @Input() list: Array<DropdownListElement>;
  @Input() defaultSelectedValue?: DropdownListElement;

  constructor(private dropdownService: DropdownService) {}

  ngOnInit(): void {
    this.setDefaultSelectedValue();
  }

  selectElement(element: DropdownListElement): void {
    this.dropdownService.setSelectedValue(element);
  }

  private setDefaultSelectedValue(): void {
    if (this.defaultSelectedValue) {
      this.selectElement(this.defaultSelectedValue);
    }
  }
}
