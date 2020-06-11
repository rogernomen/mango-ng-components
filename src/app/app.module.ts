import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {NgcDatepickerComponent} from '../../projects/mango-ng-components/src/lib/ngc-datepicker/components/ngc-datepicker/ngc-datepicker.component';
import {NgcDatepickerModule} from '../../projects/mango-ng-components/src/lib/ngc-datepicker/ngc-datepicker.module';

import {NgcCheckboxModule} from '../../projects/mango-ng-components/src/lib/ngc-checkbox/ngc-checkbox.module';
import {NgcCheckboxComponent} from '../../projects/mango-ng-components/src/lib/ngc-checkbox/components/ngc-checkbox.component';
import {NgcTriCheckboxModule} from '../../projects/mango-ng-components/src/lib/ngc-tricheckbox/ngc-tricheckbox.module';

import {NgcLoginModule} from '../../projects/mango-ng-components/src/lib/ngc-login/ngc-login.module';
import {NgcLoginComponent} from '../../projects/mango-ng-components/src/lib/ngc-login/components/ngc-login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgcPaginatorModule} from '../../projects/mango-ng-components/src/lib/ngc-paginator/ngc-paginator.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {NgcCheckboxViewComponent} from './views/ngc-checkbox-view/ngc-checkbox-view.component';
import {NgcDatepickerViewComponent} from './views/ngc-datepicker-view/ngc-datepicker-view.component';
import {NgcLoginViewComponent} from './views/ngc-login-view/ngc-login-view.component';
import {NgcPaginatorViewComponent} from './views/ngc-paginator-view/ngc-paginator-view.component';
import {NgcTricheckboxViewComponent} from './views/ngc-tricheckbox-view/ngc-tricheckbox-view.component';
import { NgcMulioptionsViewComponent } from './views/ngc-mulioptions-view/ngc-mulioptions-view.component';
import { NgcMultioptionsModule } from '../../projects/mango-ng-components/src/lib/ngc-multioptions/ngc-multioptions.module';
import {NgcModalViewComponent} from './views/modal/ngc-modal-view.component';
import {NgcModalModule} from '../../projects/mango-ng-components/src/lib/ngc-modal/ngc-modal.module';
import {ModalContentComponent} from './views/modal/parts/content/modal-content.component';
import {ModalFooterComponent} from './views/modal/parts/footer/modal-footer.component';
import {ModalHeaderComponent} from './views/modal/parts/header/modal-header.component';
import {NgcUserMenuViewComponent} from './views/user-menu/ngc-user-menu-view.component';
import {NgcUserMenuModule} from '../../projects/mango-ng-components/src/lib/ngc-user-menu/ngc-user-menu.module';
import { AuthenticationViewComponent } from './views/authentication/authentication-view/authentication-view.component';
import { NgcAuthenticationModule } from '../../projects/mango-ng-components/src/lib/ngc-authentication/ngc-authentication.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgcAuthenticationInterceptor } from 'projects/mango-ng-components/src/lib/ngc-authentication/services';
import { NgcSelectoptionModule } from '../../projects/mango-ng-components/src/lib/ngc-selectoption/ngc-selectoption.module';
import { NgcSelectoptionViewComponent } from './views/ngc-selectoption-view/ngc-selectoption-view.component';
import { NgcAuthenticationServiceTypes } from '../../projects/mango-ng-components/src/lib/ngc-authentication/models';
import {NgcDropdownViewComponent} from './views/ngc-dropdown-view/ngc-dropdown-view.component';
import {NgcDropdownModule} from '../../projects/mango-ng-components/src/lib/ngc-dropdown/ngc-dropdown.module';
import {NgcKebabMenuModule} from '../../projects/mango-ng-components/src/lib/ngc-kebab-menu/ngc-kebab-menu.module';
import { NgcKebabMenuViewComponent } from './views/ngc-kebab-menu-view/ngc-kebab-menu-view.component';
import {NgcLoaderPageViewComponent} from './views/ngc-loader-page/ngc-loader-page-view.component';
import {NgcLoaderPageModule} from '../../projects/mango-ng-components/src/lib/ngc-loader-page/ngc-loader-page.module';
import { NgcInlineDropdownModule } from '../../projects/mango-ng-components/src/lib/ngc-inline-dropdown/ngc-inline-dropdown.module';
import { NgcInlineDropdownViewComponent } from './views/ngc-inline-dropdown-view/ngc-inline-dropdown-view.component';
import { NgcAccordionViewComponent } from './views/ngc-accordion-view/ngc-accordion-view.component';
import { NgcAccordionModule } from 'projects/mango-ng-components/src/lib/ngc-accordion/ngc-accordion.module';
import { NgcToastViewComponent } from './views/ngc-toast-view/ngc-toast-view.component';
import { NgcToastModule } from 'projects/mango-ng-components/src/lib/ngc-toast/ngc-toast.module';
import { ErrorInterceptor } from './services/http-error.interceptor';
import { TextMaskViewComponent } from './views/text-mask-view/text-mask-view.component';
import { NgcTextMaskModule } from '../../projects/mango-ng-components/src/lib/ngc-text-mask/ngc-text-mask.module';
import { NgcLocaleDateMaskModule } from '../../projects/mango-ng-components/src/lib/ngc-locale-date-mask/ngc-locale-date-mask.module';
import { NgcAttachFilesModule } from 'projects/mango-ng-components/src/lib/ngc-attach-files/ngc-attach-file.module';
import { NgcAttachFilesViewComponent } from './views/ngc-attach-files-view/ngc-attach-files-view.component';
import { MultiOptionsItemComponent } from './views/ngc-mulioptions-view/multi-options-item/multi-options-item.component';
import { NgcSelectallCheckboxViewComponent } from './views/ngc-selectall-checkbox-view/ngc-selectall-checkbox-view.component';
import { NgcCheckboxSelectallModule } from 'projects/mango-ng-components/src/lib/ngc-selectall-checkbox/ngc-checkbox-selectall.module';

@NgModule({
  declarations: [
    AppComponent,
    NgcCheckboxViewComponent,
    NgcDatepickerViewComponent,
    NgcLoginViewComponent,
    NgcPaginatorViewComponent,
    NgcTricheckboxViewComponent,
    NgcMulioptionsViewComponent,
    NgcModalViewComponent,
    ModalContentComponent,
    ModalFooterComponent,
    ModalHeaderComponent,
    NgcUserMenuViewComponent,
    AuthenticationViewComponent,
    NgcSelectoptionViewComponent,
    NgcDropdownViewComponent,
    NgcKebabMenuViewComponent,
    NgcLoaderPageViewComponent,
    NgcInlineDropdownViewComponent,
    NgcAccordionViewComponent,
    NgcToastViewComponent,
    TextMaskViewComponent,
    NgcAttachFilesViewComponent,
    MultiOptionsItemComponent,
    NgcSelectallCheckboxViewComponent
  ],
  imports: [
    NgcUserMenuModule,
    NgcModalModule,
    BrowserModule,
    NgcAttachFilesModule,
    NgcDatepickerModule,
    NgcCheckboxModule,
    NgcCheckboxSelectallModule,
    NgcTriCheckboxModule,
    NgcPaginatorModule,
    NgcLoginModule,
    NgcSelectoptionModule,
    NgcMultioptionsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgcUserMenuModule,
    NgcDropdownModule,
    NgcKebabMenuModule,
    NgcLoaderPageModule,
    NgcToastModule,
    NgcInlineDropdownModule,
    NgcAccordionModule,
    BrowserAnimationsModule,
    NgcAuthenticationModule.forRoot({
      authService: NgcAuthenticationServiceTypes.MNG_AUTHENTICATION,
      baseUrl: 'http://dauthentication.mango.com/',
      applicationId: 'one_app_client'
      // authService: NgcAuthenticationServiceTypes.MNG_AUTHENTICATION,
      // baseUrl: 'http://130.61.59.245/',
      // applicationId: 'rtd'
    }),
    NgcTextMaskModule,
    NgcLocaleDateMaskModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NgcAuthenticationInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NgcDatepickerComponent, NgcCheckboxComponent, NgcLoginComponent,
    ModalContentComponent, ModalFooterComponent, ModalHeaderComponent, MultiOptionsItemComponent]
})
export class AppModule {}
