import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LoginFormValues} from '../models/LoginFormValues';
import {LoginText,LOGINTEXT_DEFAULT} from '../models/LoginText';

@Component({
  selector: 'ngc-login',
  templateUrl: './ngc-login.component.html',
  styleUrls: ['./ngc-login.component.scss']
})
export class NgcLoginComponent {
  @Input() logoSrc: string;
  
  @Input() loginText: LoginText = LOGINTEXT_DEFAULT;

  @Input() showKeepSession = false;

  @Input() isLoading = false;

  @Output() submitLogin = new EventEmitter<LoginFormValues>();

  formState: LoginFormValues = new LoginFormValues();

  login(ngForm): void {
    if (ngForm.form.valid) {
      this.loginText.errorMessage = undefined;
      this.submitLogin.emit(this.formState);
    }
  }
}
