import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgcLoginComponent} from './components/ngc-login.component';
import {InputPasswordComponent} from './components/input/input-password.component';
import {NgModule} from '@angular/core';
import { NgcCheckboxModule } from '../ngc-checkbox/ngc-checkbox.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgcCheckboxModule
  ],
  declarations: [NgcLoginComponent, InputPasswordComponent],
  exports: [NgcLoginComponent]
})
export class NgcLoginModule { }
