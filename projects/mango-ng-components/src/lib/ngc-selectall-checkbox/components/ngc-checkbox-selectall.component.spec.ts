import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NgcCheckboxSelectallComponent } from './ngc-checkbox-selectall.component';
import { FormsModule } from '@angular/forms';
import { NgcCheckboxComponent } from '../../ngc-checkbox/components/ngc-checkbox.component';

describe('NgcSelectallCheckboxComponent', () => {
  let component: NgcCheckboxSelectallComponent;
  let fixture: ComponentFixture<NgcCheckboxSelectallComponent>;

    beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
          NgcCheckboxSelectallComponent,
          NgcCheckboxComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcCheckboxSelectallComponent);
    component = fixture.componentInstance;
    component.options = [
      {id: '01-BLANCO', name: 'BLANCO', value: 'BLANCO', label: 'BLANCO'},
      {id: '20-NARANJA', name: 'NARANJA', value: 'NARANJA', label: 'NARANJA'},
      {id: '52-AZUL', name: 'AZUL', value: 'AZUL', label: 'AZUL'},
      {id: '99-NEGRO', name: 'NEGRO', value: 'NEGRO', label: 'NEGRO'}
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should tick all checkboxes when Seleccionar todo is selected' +
  'when onSelectAll() is called', () => {
    component.selectedAll.push(component.idSelectAll);
    expect(component.selectedAll.length).toBe(1);
    expect(component.selectedItems.length).toBe(0);
    component.onSelectAll();
    expect(component.selectedItems.length).toBe(4);
    expect(component.isIndeterminate).toBeFalsy();
  });

  it('should untick all checkboxes when Seleccionar todo is selected' +
  'when onSelectAll() is called', () => {
    component.isIndeterminate = false;
    expect(component.selectedAll.length).toBe(0);
    component.selectedItems = [
      'BLANCO',
      'NEGRO',
      'NARANJA'
    ];
    expect(component.selectedItems.length).toBe(3);
    component.onSelectAll();
    expect(component.selectedItems.length).toBe(0);
    expect(component.selectedAll.length).toBe(0);
    expect(component.isIndeterminate).toBeFalsy();
  });

  it('should tick Seleccionar todo checkbox when all the other checkboxes are selected', () => {
    expect(component.selectedAll.length).toBe(0);
    component.selectedItems = [
      'BLANCO',
      'NEGRO',
      'NARANJA',
      'AZUL'
    ];
    expect(component.selectedItems.length).toBe(4);
    component.onSelectOtherOption();
    expect(component.selectedItems.length).toBe(4);
    expect(component.selectedAll.length).toBe(1);
    expect(component.isIndeterminate).toBeFalsy();
    expect(component.checkedSelectAllOption).toBeTruthy();
  });

  it('should mark as indeterminated Seleccionar todo checkbox when there are some checkboxes are selected', () => {
    expect(component.selectedAll.length).toBe(0);
    component.selectedItems = [
      'BLANCO',
      'NEGRO'
    ];
    expect(component.selectedItems.length).toBe(2);
    component.onSelectOtherOption();
    expect(component.selectedAll.length).toBe(0);
    expect(component.isIndeterminate).toBeTruthy();
  });
});
