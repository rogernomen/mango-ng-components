import { Component, OnInit } from '@angular/core';
import {LoginText} from '../../../../projects/mango-ng-components/src/lib/ngc-login/models/LoginText';
import {LoginFormValues} from '../../../../projects/mango-ng-components/src/lib/ngc-login/models/LoginFormValues';


@Component({
  selector: 'ngc-login-view',
  templateUrl: './ngc-login-view.component.html',
  styleUrls: ['./ngc-login-view.component.scss']
})
export class NgcLoginViewComponent implements OnInit{

  loadingLogin = false;
  html = `
  <ngc-login [loginText]="loginText" [logoSrc]="vLogo" (submitLogin)="onSubmit($event)"></ngc-login>
  `;

  ts = `
  errorMessage: string = undefined;
  loginText: LoginText;
  vLogo:string = "../../assets/img/logo-login.png";

  ngOnInit() {

    this.loginText = new LoginText();
    this.loginText.userInputPlaceholder = "Usuario";
    //...
  }
  onSubmit(loginFormData: LoginFormValues): void {
    console.log("onSubmit clicked. LoginFormValues:");
    console.log(LoginFormValues);
  }`;
  errorMessage: string = undefined;
  loginText: LoginText;
  vLogo = '../../assets/img/logo-login.png';

  ngOnInit() {

    this.loginText = new LoginText();
    this.loginText.userInputPlaceholder = 'Usuario'; 
    this.loginText.passwordInputPlaceholder = 'Password';
    this.loginText.submitLabel = 'Acceder';

  }

  onSubmit(loginFormData: LoginFormValues): void {
    this.loadingLogin = true;

    setTimeout(() => {
      this.loadingLogin = false;
    }, 3000);
    console.log('onSubmit clicked. LoginFormValues:');
    console.log(loginFormData);
  }
}
