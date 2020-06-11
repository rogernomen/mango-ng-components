import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgcUserMenuComponent} from './components/ngc-user-menu.component';
import {RouterModule} from '@angular/router';
import {NgcUserMenuItemComponent} from './components/ngc-user-menu-item/ngc-user-menu-item.component';
import {NgcUserMenuHeadComponent} from './components/ngc-user-menu-head/ngc-user-menu-head.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [NgcUserMenuComponent],
  declarations: [NgcUserMenuComponent, NgcUserMenuItemComponent, NgcUserMenuHeadComponent]
})
export class NgcUserMenuModule { }
