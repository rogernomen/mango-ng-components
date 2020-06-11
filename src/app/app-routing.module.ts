import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NgcCheckboxViewComponent} from './views/ngc-checkbox-view/ngc-checkbox-view.component';
import {NgcDatepickerViewComponent} from './views/ngc-datepicker-view/ngc-datepicker-view.component';
import {NgcLoginViewComponent} from './views/ngc-login-view/ngc-login-view.component';
import {NgcPaginatorViewComponent} from './views/ngc-paginator-view/ngc-paginator-view.component';
import {NgcTricheckboxViewComponent} from './views/ngc-tricheckbox-view/ngc-tricheckbox-view.component';
import { NgcMulioptionsViewComponent } from './views/ngc-mulioptions-view/ngc-mulioptions-view.component';
import {NgcModalViewComponent} from './views/modal/ngc-modal-view.component';
import {NgcUserMenuViewComponent} from './views/user-menu/ngc-user-menu-view.component';
import { AuthenticationViewComponent } from './views/authentication/authentication-view/authentication-view.component';
import { NgcSelectoptionViewComponent } from './views/ngc-selectoption-view/ngc-selectoption-view.component';
import {NgcDropdownViewComponent} from './views/ngc-dropdown-view/ngc-dropdown-view.component';
import {NgcKebabMenuViewComponent} from './views/ngc-kebab-menu-view/ngc-kebab-menu-view.component';
import {NgcLoaderPageViewComponent} from './views/ngc-loader-page/ngc-loader-page-view.component';
import { NgcInlineDropdownViewComponent } from './views/ngc-inline-dropdown-view/ngc-inline-dropdown-view.component';
import { NgcAccordionViewComponent } from './views/ngc-accordion-view/ngc-accordion-view.component';
import { NgcToastViewComponent } from './views/ngc-toast-view/ngc-toast-view.component';
import { NgcAttachFilesViewComponent } from './views/ngc-attach-files-view/ngc-attach-files-view.component';
import { TextMaskViewComponent } from './views/text-mask-view/text-mask-view.component';
import { NgcSelectallCheckboxViewComponent } from './views/ngc-selectall-checkbox-view/ngc-selectall-checkbox-view.component';

const routes: Routes = [
  { path: 'ngc-checkbox', component: NgcCheckboxViewComponent, pathMatch: 'full' },
  { path: 'ngc-datepicker', component: NgcDatepickerViewComponent, pathMatch: 'full' },
  { path: 'ngc-login', component: NgcLoginViewComponent, pathMatch: 'full' },
  { path: 'ngc-paginator', component: NgcPaginatorViewComponent, pathMatch: 'full' },
  { path: 'ngc-tricheckbox', component: NgcTricheckboxViewComponent, pathMatch: 'full' },
  { path: 'ngc-multioptions', component: NgcMulioptionsViewComponent, pathMatch: 'full' },
  { path: 'ngc-modal', component: NgcModalViewComponent, pathMatch: 'full' },
  { path: 'ngc-user-menu', component: NgcUserMenuViewComponent, pathMatch: 'full' },
  { path: 'ngc-authentication', component: AuthenticationViewComponent, pathMatch: 'full' },
  { path: 'ngc-selectoption', component: NgcSelectoptionViewComponent, pathMatch: 'full' },
  { path: 'ngc-dropdown', component: NgcDropdownViewComponent, pathMatch: 'full' },
  { path: 'ngc-kebab-menu', component: NgcKebabMenuViewComponent, pathMatch: 'full' },
  { path: 'ngc-loader-page', component: NgcLoaderPageViewComponent, pathMatch: 'full' },
  { path: 'ngc-inline-dropdown', component: NgcInlineDropdownViewComponent, pathMatch: 'full'},
  { path: 'ngc-accordion', component: NgcAccordionViewComponent, pathMatch: 'full'},
  { path: 'ngc-toast', component: NgcToastViewComponent, pathMatch: 'full'},
  { path: 'ngc-text-mask', component: TextMaskViewComponent, pathMatch: 'full'},
  { path: 'ngc-attach-files', component: NgcAttachFilesViewComponent, pathMatch: 'full'},
  { path: 'ngc-selectall-checkbox', component: NgcSelectallCheckboxViewComponent, pathMatch: 'full'},
  { path: '**', redirectTo: 'ngc-checkbox' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
