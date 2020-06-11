import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgcMultioptionsItemComponent } from './ngc-multioptions-item.component';
import { ComponentFactoryResolver, SimpleChange } from '@angular/core';
import { ItemDirective } from '../../../directives/item.directive';

describe('NgcMultioptionsItemComponent', () => {
  let spies: any;
  let component: NgcMultioptionsItemComponent;
  let fixture: ComponentFixture<NgcMultioptionsItemComponent>;
  let componentFactoryResolver: ComponentFactoryResolver;
  const mockComponentFactory = 'cf_comp1';
  const mockComponentRef = {
    instance: {
      data: '...'
    }
  };
  class MockComponent {
    name = 'Comp1';
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcMultioptionsItemComponent, ItemDirective ],
      providers: [
        {provide: ComponentFactoryResolver,
          useValue: {
            resolveComponentFactory: () => {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcMultioptionsItemComponent);
    component = fixture.componentInstance;
    componentFactoryResolver = TestBed.get(ComponentFactoryResolver);
    component.option = {id: '12-AMARILLO', text: 'AMARILLO'};
    loadSpies();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadComponent when option.dinamicContent is present',  () => {

    const newOption = {
      id: '12-AMARILLO',
      text: 'AMARILLO',
      dinamicContent: { component: MockComponent,
                        data: { text: ' amarillo ', rgb: '(255,255,000)' }
      }
    };
    component.option = newOption;
    component.ngOnChanges({
      option: new SimpleChange(undefined, newOption, false)
    });

    expect(spies.viewContainerRef.clear).toHaveBeenCalled();
    expect(spies.componentFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(MockComponent);
    expect(spies.viewContainerRef.createComponent).toHaveBeenCalledWith(mockComponentFactory);
  });

  it('should loadComponent when option.dinamicContent is not present',  () => {

    const newOption = {
      id: '12-AMARILLO',
      text: 'AMARILLO'
    };
    component.option = newOption;
    component.ngOnChanges({
      option: new SimpleChange(undefined, newOption, false)
    });

    expect(spies.viewContainerRef.clear).toHaveBeenCalled();
    expect(spies.componentFactoryResolver.resolveComponentFactory).not.toHaveBeenCalled();
    expect(spies.viewContainerRef.createComponent).not.toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      viewContainerRef: {
        clear: spyOn(component.adHost.viewContainerRef, 'clear').and.callThrough(),
        createComponent: spyOn(component.adHost.viewContainerRef, 'createComponent').and.returnValue(mockComponentRef)
      },
      componentFactoryResolver: {
        resolveComponentFactory: spyOn(componentFactoryResolver, 'resolveComponentFactory').and.returnValue(mockComponentFactory)
      }
    };
  }

});
