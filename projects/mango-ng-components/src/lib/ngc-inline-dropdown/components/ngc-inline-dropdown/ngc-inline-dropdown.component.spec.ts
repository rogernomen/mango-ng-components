import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcInlineDropdownComponent } from './ngc-inline-dropdown.component';

describe('NgcInlineDropdownComponent', () => {
  let component: NgcInlineDropdownComponent;
  let fixture: ComponentFixture<NgcInlineDropdownComponent>;
  let spies;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcInlineDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcInlineDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should orderBy', () => {
    component.orderBy({label: 'label', value: 'value'});
    expect(component.selectedOption).toBe('label');
    expect(spies.component.select).toHaveBeenCalledWith('value');
  });

  it('should toggleDropdownVisibility', () => {
    component.dropdownVisible = false;
    component.toggleDropdownVisibility();
    expect(component.dropdownVisible).toBeTruthy();
  });

  function loadSpies() {
    spies = {
      component: {
        select: spyOn(component.clickOption, 'emit').and.callThrough()
      }
    };
  }

});
