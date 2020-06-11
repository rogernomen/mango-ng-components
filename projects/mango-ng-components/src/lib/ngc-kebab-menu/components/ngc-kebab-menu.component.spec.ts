import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcKebabMenuComponent } from './ngc-kebab-menu.component';
import { Renderer } from '@angular/core';

describe('MngKebabMenuComponent', () => {
  let component: NgcKebabMenuComponent;
  let fixture: ComponentFixture<NgcKebabMenuComponent>;
  let spies: any;
  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeAll((done) => (async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [
        NgcKebabMenuComponent
      ],
      providers: [
        Renderer
      ]
    });
    await TestBed.compileComponents();

    // prevent Angular from resetting testing module
    TestBed.resetTestingModule = () => TestBed;

  })().then(done).catch(done.fail));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcKebabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loadSpies();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be bindDocumentClickListener', () => {
    component.bindDocumentClickListener();
    expect(component.openKebabMenu).toBeFalsy();
  });

  it('should be selected item', () => {
    component.selectItem({'id': 1, 'title': 'Eliminar'});
    expect(spies.component.selectedItemEmit).toHaveBeenCalled();
    expect(spies.component.toogleMenu).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      component: {
        selectedItemEmit: spyOn(component.selectedItem, 'emit').and.callThrough(),
        toogleMenu: spyOn(component, 'toggleMenu').and.callThrough()
      }
    }
  }

  afterAll( () => {
    localStorage.clear();
    sessionStorage.clear();
    // reinstate resetTestingModule method
    TestBed.resetTestingModule = oldResetTestingModule;
    TestBed.resetTestingModule();
  });

});
