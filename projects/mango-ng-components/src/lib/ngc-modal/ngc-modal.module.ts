import { CommonModule } from '@angular/common';
import {NgModule} from '@angular/core';
import {NgcModalService} from './services/ngc-modal.service';
import {NgcModalComponent} from './components/ngc-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgcModalComponent],
  providers: [NgcModalService],
  entryComponents: [NgcModalComponent]
})
export class NgcModalModule { }
