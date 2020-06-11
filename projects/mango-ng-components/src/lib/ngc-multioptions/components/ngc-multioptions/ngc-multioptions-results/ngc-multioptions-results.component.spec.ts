import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcMultioptionsResultsComponent } from './ngc-multioptions-results.component';
import { FormsModule } from '@angular/forms';
import { NgcMultioptionsItemComponent } from '../ngc-multioptions-item/ngc-multioptions-item.component';

describe('NgcMultioptionsResultsComponent', () => {
  let component: NgcMultioptionsResultsComponent;
  let fixture: ComponentFixture<NgcMultioptionsResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ NgcMultioptionsResultsComponent, NgcMultioptionsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcMultioptionsResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initizalize optionsSearched & optionsSearchedVisible when onChangeFilterBy is called', () => {

    component.options = [
      {id: '01-BLANCO', text: 'BLANCO'},
      {id: '12-AMARILLO', text: 'AMARILLO'},
      {id: '20-NARANJA', text: 'NARANJA'},
      {id: '52-AZUL', text: 'AZUL'},
      {id: '99-NEGRO', text: 'NEGRO'}
    ];

    component.onChangeFilterBy('N');

    expect(component.optionsSearched).toEqual([
      {id: '01-BLANCO', text: 'BLANCO'},
      {id: '20-NARANJA', text: 'NARANJA'},
      {id: '99-NEGRO', text: 'NEGRO'}
    ]);
    expect(component.optionsSearchedVisible).toBeTruthy();

    component.onChangeFilterBy('NNNNN');

    expect(component.optionsSearched).toEqual([]);
    expect(component.optionsSearchedVisible).toBeTruthy();

    component.onChangeFilterBy(null);

    expect(component.optionsSearched).toEqual([]);
    expect(component.optionsSearchedVisible).toBeFalsy();

  });

  it('should return an option selectec when optionSelected function is called', () => {

    component.options = [
      {id: '01-BLANCO', text: 'BLANCO'},
      {id: '12-AMARILLO', text: 'AMARILLO'},
      {id: '20-NARANJA', text: 'NARANJA'},
      {id: '52-AZUL', text: 'AZUL'},
      {id: '99-NEGRO', text: 'NEGRO'}
    ];
    component.optionsSelected = [];
    component.optionsSelected.push({id: '20-NARANJA', text: 'NARANJA'});

    expect(component.optionSelected('20-NARANJA')).toEqual({id: '20-NARANJA', text: 'NARANJA'});
  });

  it('should initizalize FilterBy & optionsSearched & optionsSearchedVisible when clearFilter is called', () => {

    component.filterBy = 'N';
    component.optionsSearched = [
      {id: '01-BLANCO', text: 'BLANCO'},
      {id: '20-NARANJA', text: 'NARANJA'},
      {id: '99-NEGRO', text: 'NEGRO'}
    ];
    component.optionsSearchedVisible = true;

    component.clearFilter();

    expect(component.filterBy).toEqual('');
    expect(component.optionsSearched).toEqual([]);
    expect(component.optionsSearchedVisible).toBeFalsy();
  });

});
