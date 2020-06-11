import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MultioptionsItem, MultioptionsText } from '../../../models';

@Component({
  selector: 'ngc-multioptions-selected',
  templateUrl: './ngc-multioptions-selected.component.html',
  styleUrls: ['./ngc-multioptions-selected.component.scss']
})
export class NgcMultioptionsSelectedComponent implements OnInit {

  @Input() options: MultioptionsItem[];
  @Input() multioptionsText: MultioptionsText;
  @Output() unSelectOption: EventEmitter<MultioptionsItem> = new EventEmitter<MultioptionsItem>();

  constructor() { }

  ngOnInit() {
  }

  _unSelectOption(option) {
    this.unSelectOption.emit(option);
  }

}
