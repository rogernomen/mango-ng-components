import { NgcMaskedInputDirective } from './ngc-masked-input.directive';
import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


// const mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
@Component({
  template: '<input [ngcTextMask]="{mask: mask}" type="text" name="date" value="" />'
}) export class MarkedInputDirectiveComponent {
  mask: Array<RegExp | string> = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
}

describe('NgcMaskedInputDirective', () => {

  let component: MarkedInputDirectiveComponent;
  let fixture: ComponentFixture<MarkedInputDirectiveComponent>;
  let inputElement: DebugElement;
  let directive: NgcMaskedInputDirective;
  let spies;
  const event = {
    target: {
      value: '01122019'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkedInputDirectiveComponent, NgcMaskedInputDirective]
    });
    fixture = TestBed.createComponent(MarkedInputDirectiveComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    const directiveEl = fixture.debugElement.query(By.directive(NgcMaskedInputDirective));
    directive = directiveEl.injector.get(NgcMaskedInputDirective);
    fixture.detectChanges();
    loadSpies();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set input settings when input listener is called', () => {
    inputElement.triggerEventHandler('input', event);
    expect(spies.directive._handleInput).toHaveBeenCalled();
    expect(spies.directive._setupMask).toHaveBeenCalled();
  });

  it('should set blur settings when blur listener is called', () => {
    inputElement.triggerEventHandler('blur', '');
    expect(spies.directive.onTouched).toHaveBeenCalled();
  });

  it('should set compositionstart settings when compositionstart listener is called', () => {
    inputElement.triggerEventHandler('compositionstart', '');
    expect(spies.directive._compositionStart).toHaveBeenCalled();
  });

  it('should set HostListener settings when HostListener listener is called', () => {
    inputElement.triggerEventHandler('compositionend', event);
    expect(spies.directive._compositionEnd).toHaveBeenCalled();
    expect(spies.directive._handleInput).toHaveBeenCalled();
    expect(spies.directive._setupMask).toHaveBeenCalled();
  });

  it('should call setupMask when writeValue is called', () => {
    directive.writeValue(event.target.value);
    expect(spies.directive._setupMask).toHaveBeenCalled();
    const inputValue = fixture.debugElement.query(By.css('input')).properties.value;
    expect(inputValue).toEqual(event.target.value);
  });

  function loadSpies() {
    spies = {
      directive: {
        _handleInput: spyOn(directive, '_handleInput').and.callThrough(),
        _setupMask: spyOn(directive, '_setupMask').and.callThrough(),
        onTouched: spyOn(directive, 'onTouched').and.callThrough(),
        _compositionStart: spyOn(directive, '_compositionStart').and.callThrough(),
        _compositionEnd: spyOn(directive, '_compositionEnd').and.callThrough()
      }
    };
  }
});
