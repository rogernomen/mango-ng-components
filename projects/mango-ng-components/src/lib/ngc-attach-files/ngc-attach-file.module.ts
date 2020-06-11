import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { NgcAttachFilesComponent } from './components/ngc-attach-files.component';
import { DndDirective } from './directives/dnd.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [NgcAttachFilesComponent, DndDirective],
  exports: [NgcAttachFilesComponent]
})
export class NgcAttachFilesModule { }
