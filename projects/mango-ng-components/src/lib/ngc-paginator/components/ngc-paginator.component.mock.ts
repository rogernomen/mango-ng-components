import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as events from 'events';

@Component({
  selector: 'pc-pagination',
  template: '<div></div>',

})
export class PcPaginationComponentMock {

  @Input() totalPages: any;
  @Input() actualPage: number;
  @Output() changePage: EventEmitter<any> = new EventEmitter();

}
