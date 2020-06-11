import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgcToastHolder } from './holders/toast.holder';
import { NgcToastService } from './services/toast.service';
import { NgcToastComponent } from './components/ngc-toast/ngc-toast.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgcToastComponent],
  providers: [
    NgcToastHolder,
    NgcToastService
  ],
  exports: [NgcToastComponent],
})
export class NgcToastModule {}
