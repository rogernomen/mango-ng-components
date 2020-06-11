
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import {NgcCheckboxComponent} from './ngc-checkbox.component';

export class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('VmCheckboxComponent', () => {
  let component: NgcCheckboxComponent;
  let fixture: ComponentFixture<NgcCheckboxComponent>;
  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [],
      declarations: [NgcCheckboxComponent]
    });

    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;

  })().then(done).catch(done.fail));


  beforeEach(() => {
    fixture = TestBed.createComponent(NgcCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change setSelected values', () => {
    const element: any = { target: {
      checked: true,
      value: '1' }};

    component.selectedItems = [];
    component.setSelected(element);
    expect(component.checked).toBeTruthy();
    expect(component.selectedItems).toEqual(['1']);

    element.target.checked = false;
    component.setSelected(element);
    expect(component.checked).toBeFalsy();
    expect(component.selectedItems).toEqual([]);

  });

  afterAll( () => {
    localStorage.clear();
    sessionStorage.clear();
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });
});
