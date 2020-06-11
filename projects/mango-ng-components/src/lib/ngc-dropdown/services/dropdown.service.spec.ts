import { TestBed} from '@angular/core/testing';
import {DropdownService} from './dropdown.service';
import {CommonModule} from '@angular/common';
import {DropdownListElement} from '../ngc-dropdown-list/models/dropdownList.model';

describe('DropdownService', () => {
  let dropdownService: DropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      providers: [
        DropdownService
      ]
    });
    dropdownService = TestBed.get(DropdownService);
  });

  it('should be created', () => {
    expect(dropdownService).toBeTruthy();
  });

  it('should set selected value when setSelectedValue method is called', () => {
    dropdownService.setSelectedValue(new DropdownListElement('test'));
    dropdownService.getCurrentValue().subscribe((currentValue) => {
      expect(currentValue.label).toEqual('test');
    });
  });
});
