import {NgcLoginComponent} from './ngc-login.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {InputPasswordComponent} from './input/input-password.component';
//import {FormMessagesComponent} from './form-messages/form-messages.component';
import {FormsModule, NgForm} from '@angular/forms';
import { NgcCheckboxComponent } from '../../ngc-checkbox/components/ngc-checkbox.component';
//import {TranslateModule} from '@ngx-translate/core';

describe('LoginViewComponent', () => {
  let fixture: ComponentFixture<NgcLoginComponent>;
  let component: NgcLoginComponent;
  let el: DebugElement;
  let spies: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NgcLoginComponent,
        InputPasswordComponent,
        NgcCheckboxComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcLoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();

    loadSpies();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send the form when its valid', () => {
      component.loginText.errorMessage = 'errorMessage';
      const testForm = <NgForm>{
        value: {
          username: 'username',
          password: 'password'
        },
        form: {valid: true}
      };

      component.login(testForm);
      expect(component.loginText.errorMessage).toBeUndefined();
      expect(spies.component.emit).toHaveBeenCalled();
  });

  function loadSpies() {
    spies = {
      component: {
        emit: spyOn(component.submitLogin, 'emit').and.callThrough()
      }
    }
  }
});
