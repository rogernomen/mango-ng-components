import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {NgcDropdownComponent} from './ngc-dropdown.component';
import {DropdownMockService} from '../services/dropdown.mock.service';
import {DropdownService} from '../services/dropdown.service';
import {FormsModule} from '@angular/forms';
import {NgcDropdownListMockComponent} from '../ngc-dropdown-list/components/ngc-dropdown-list.mock.component';


describe('NgcDropdownComponent', () => {
  let component: NgcDropdownComponent;
  let dropdownService: DropdownService;
  let fixture: ComponentFixture<NgcDropdownComponent>;
  let spies;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NgcDropdownComponent,
        NgcDropdownListMockComponent
      ],
      providers: [
        {provide: DropdownService, useClass: DropdownMockService}
      ]
    }).compileComponents();
    dropdownService = TestBed.get(DropdownService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loadSpies();
  });

  beforeEach(() => {
    component.config = {
      disabled: false,
      placeholder: 'test'
    };
  });

  it('should create the component', () => {
    component.config = {
      disabled: false,
      placeholder: 'test'
    };
    expect(component).toBeTruthy();
  });

  it('should listen on document click event', () => {
    component.config = {
      disabled: false,
      placeholder: 'test'
    };
    component.ngOnInit();
    expect(component.documentClick).not.toBeNull();
  });

  function loadSpies() {
    spies = {
      dropdownService: {
        setSelectedValue: spyOn(dropdownService, 'setSelectedValue').and.callThrough(),
        getCurrentValue: spyOn(dropdownService, 'getCurrentValue').and.callThrough()
      },
      component: {
        selectEvent: spyOn(component.selectEvent, 'emit').and.callThrough()
      }
    };
  }
});
