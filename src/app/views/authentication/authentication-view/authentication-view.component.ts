import { Component, OnInit } from '@angular/core';
import { NgcAuthenticationService } from 'projects/mango-ng-components/src/lib/ngc-authentication/services';
import { NgcAuthenticationStorageTypes } from 'projects/mango-ng-components/src/lib/ngc-authentication/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentication-view',
  templateUrl: './authentication-view.component.html',
  styleUrls: ['./authentication-view.component.css']
})
export class AuthenticationViewComponent implements OnInit {

  private username: string;
  private password: string;

  constructor(
    private authenticationService: NgcAuthenticationService,
    private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onLogin() {
    this.authenticationService.login(this.username, this.password, NgcAuthenticationStorageTypes.LOCAL).subscribe(loginResp => {
    //this.authenticationService.login('03733728', 'SmliYWt1MjM=').subscribe(loginResp => {
      console.log('Login OK!');
      console.log(loginResp);
    }, error => {
      console.log('Login ERROR!');
      console.log(error);
    });
  }

  getToken() {
    console.log('getToken!');
    console.log(this.authenticationService.getToken());
  }

  getRoles() {
    console.log('getRoles!');
    console.log(this.authenticationService.getRoles());
  }

  refreshToken() {
    this.authenticationService.refreshToken().subscribe(refreshResp => {
      console.log('refreshResp OK!');
      console.log(refreshResp);
    }, error => {
      console.log('refreshResp ERROR!');
      console.log(error);
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(logoutResp => {
      console.log('logoutResp OK!');
      console.log(logoutResp);
    }, error => {
      console.log('logoutResp ERROR!');
      console.log(error);
    });
  }

  isLoggedIn() {
    console.log('isLoggedIn!');
    console.log(this.authenticationService.isLoggedIn());
  }

  clickCallSecuredEndPoint() {
    this.callSecuredEndPoint().subscribe(
      (data) => { console.log('callSecuredEndPoint OK:', data); },
      (data) => { console.log('callSecuredEndPoint Error:', data); },
    );
  }

  callSecuredEndPoint(): Observable<any> {
    const url = 'oneapp/oap-back/form';
    return this.httpClient.get(url);
  }

}
