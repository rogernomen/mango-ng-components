import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcSelectoptionItemComponent } from './ngc-selectoption-item.component';
import { SelectoptionService } from '../../services/selectoption.service';
import { of } from 'rxjs';

describe('NgcSelectoptionItemComponent', () => {
  let component: NgcSelectoptionItemComponent;
  let fixture: ComponentFixture<NgcSelectoptionItemComponent>;
  let spies;
  let selectoptionService: SelectoptionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcSelectoptionItemComponent ],
      providers: [
        SelectoptionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcSelectoptionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    selectoptionService = TestBed.get(SelectoptionService);

    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to selectoptionService.getSearchedText when ngOnInit is called', () => {
    component.ngOnInit();
    expect(spies.component.getSearchedText).toHaveBeenCalled();
  });

  it('should refresh selectedText (calling updateSelectedText) when itemClick is called', () => {
    component.itemClick();
    expect(spies.component.updateSelectedText).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      component: {
        getSearchedText: spyOn(selectoptionService, 'getSearchedText').and.returnValue(of(null)),
        updateSelectedText: spyOn(selectoptionService, 'updateSelectedText')
      }
    };
  }
});
