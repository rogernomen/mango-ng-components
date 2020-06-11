import { Component } from '@angular/core';
import {LoginText} from '../../projects/mango-ng-components/src/lib/ngc-login/models/LoginText';
import {LoginFormValues} from '../../projects/mango-ng-components/src/lib/ngc-login/models/LoginFormValues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mango-ng-components-app';
  model = null;

  onCheckboxSelected($event) {
    console.log('event', $event);
  }

  //Test ngcLogin
  loginText: LoginText;
    
  ngOnInit() {     

    this.loginText = new LoginText();
    this.loginText.passwordInputPlaceholder = "placeholder pel password";

  }

  onSubmit(loginFormData: LoginFormValues): void {
    console.log("onSubmit:");
    console.log(loginFormData.username);
    this.loginText.errorMessage = "ERROR FORÇAT AL ONSUBMIT!!!";
  }
  //FI-Test ngcLogin
}
