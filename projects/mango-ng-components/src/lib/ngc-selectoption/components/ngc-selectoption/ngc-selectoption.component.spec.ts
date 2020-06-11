import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgcSelectoptionComponent } from './ngc-selectoption.component';
import { FormsModule } from '@angular/forms';
import { SelectoptionService } from '../../services/selectoption.service';

describe('NgcSelectoptionComponent', () => {
  let component: NgcSelectoptionComponent;
  let fixture: ComponentFixture<NgcSelectoptionComponent>;
  let selectoptionService: SelectoptionService;
  let spies;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NgcSelectoptionComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcSelectoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    selectoptionService = fixture.debugElement.injector.get(SelectoptionService);

    loadSpies();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh selectedText & searchedText & resultView (calling updateSearchedText) when updateSelectedText is called', () => {
    const textoSeleccionado = '<Texto seleccionado>';

    component.updateSelectedText(textoSeleccionado);
    expect(component.selectedText).toEqual(textoSeleccionado);
    expect(component.searchedText).toEqual(textoSeleccionado);
    expect(spies.component.updateSearchedText).toHaveBeenCalled();
  });

  it('should refresh searchedText & resultView (calling updateSearchedText) when refreshView is called', () => {
    const textoSeleccionado = '<Texto seleccionado>';
    component.selectedText = textoSeleccionado;

    component.refreshView();
    expect(component.searchedText).toEqual(textoSeleccionado);
    expect(spies.component.updateSearchedText).toHaveBeenCalled();
  });

  it('should refresh resultView (calling updateSearchedText) when refreshResultView is called', () => {
    component.searchedText = '<Texto buscado>';

    component.refreshResultView();
    expect(spies.component.updateSearchedText).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      component: {
        updateSearchedText: spyOn(selectoptionService, 'updateSearchedText')
      }
    };
  }
});
