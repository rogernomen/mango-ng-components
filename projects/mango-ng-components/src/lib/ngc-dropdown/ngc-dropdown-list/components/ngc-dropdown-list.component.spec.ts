import { TestBed, async } from '@angular/core/testing';
import {NgcDropDownListComponent} from './ngc-dropdown-list.component';
import {DropdownService} from '../../services/dropdown.service';
import {DropdownMockService} from '../../services/dropdown.mock.service';
import {DropdownListElement} from '../models/dropdownList.model';


describe('NgcDropdownListComponent', () => {
  let fixture;
  let component;
  let dropdownService: DropdownService;
  let spies;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgcDropDownListComponent
      ],
      providers: [
        {provide: DropdownService, useClass: DropdownMockService}
      ]
    }).compileComponents();

    dropdownService = TestBed.get(DropdownService);

    loadSpies();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcDropDownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select element when selectElement method is called', () => {
    const dropElement = new DropdownListElement('test');
    component.selectElement(new DropdownListElement('test'));
    expect(spies.dropdownService.setSelectedValue).toHaveBeenCalledWith(dropElement);
  });

  function loadSpies() {
    spies = {
      dropdownService: {
        setSelectedValue: spyOn(dropdownService, 'setSelectedValue').and.callThrough()
      }
    };
  }
});
