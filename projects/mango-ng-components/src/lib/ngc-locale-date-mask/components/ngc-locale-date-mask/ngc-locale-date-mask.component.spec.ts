import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcLocaleDateMaskComponent } from './ngc-locale-date-mask.component';
import { NgcTextMaskModule } from '../../../ngc-text-mask/ngc-text-mask.module';
import { FormsModule } from '@angular/forms';


describe('NgcLocaleDateMaskComponent', () => {
  let component: NgcLocaleDateMaskComponent;
  let fixture: ComponentFixture<NgcLocaleDateMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcLocaleDateMaskComponent ],
      imports: [ NgcTextMaskModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcLocaleDateMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configure default values when window.navigator.language is not managed', () => {
    spyOnProperty(window.navigator, 'language', 'get').and.returnValue('XX-XX');
    component.configureComponent();

    expect(component.placeHolder).toEqual('MM/DD/YYYY');
    expect(component.textMaskConfig.mask).toEqual([/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]);
  });

  it('should return date with YYYY-MM-DD format when onInput is called with date with component.dateFormat format', () => {
    spyOnProperty(window.navigator, 'language', 'get').and.returnValue('XX-XX');
    component.configureComponent();
    const componentOnModelChangeSpy = spyOn(component, 'onModelChange');

    component.onInput('12/01/2019');
    expect(componentOnModelChangeSpy).toHaveBeenCalledWith('2019-12-01');

    component.onInput('12/01');
    expect(componentOnModelChangeSpy).toHaveBeenCalledWith('12/01');
  });

  it('should ini value with date with component.dateFormat format when writeValue is called with date with YYYY-MM-DD format', () => {
    spyOnProperty(window.navigator, 'language', 'get').and.returnValue('XX-XX');
    component.configureComponent();

    component.writeValue('2019-12-01');
    expect(component.value).toEqual('12/01/2019');

    component.writeValue('2019-12');
    expect(component.value).toEqual('');
  });
});
