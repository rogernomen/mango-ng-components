import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcMultioptionsComponent } from './components/ngc-multioptions/ngc-multioptions.component';
import { FormsModule } from '@angular/forms';
import { NgcMultioptionsResultsComponent } from './components/ngc-multioptions/ngc-multioptions-results/ngc-multioptions-results.component';
import { NgcMultioptionsSelectedComponent } from './components/ngc-multioptions/ngc-multioptions-selected/ngc-multioptions-selected.component';
import { NgcMultioptionsItemComponent } from './components/ngc-multioptions/ngc-multioptions-item/ngc-multioptions-item.component';
import { ItemDirective } from './directives/item.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NgcMultioptionsComponent,
    NgcMultioptionsResultsComponent,
    NgcMultioptionsSelectedComponent,
    NgcMultioptionsItemComponent,
    ItemDirective],
  exports: [NgcMultioptionsComponent]
})
export class NgcMultioptionsModule { }
