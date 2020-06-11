import {
  Component, OnInit, Input, ChangeDetectorRef,
  forwardRef, EventEmitter, Output
} from '@angular/core';
import * as _ from 'lodash';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MultioptionsItem } from '../../models/multioptions-item.model';
import { MultioptionsText, MULTIOPTIONSTEXT_DEFAULT } from '../../models/multioptions-text';

export const MULTIOPTIONS_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcMultioptionsComponent),
  multi: true
};

@Component({
  selector: 'ngc-multioptions',
  templateUrl: './ngc-multioptions.component.html',
  styleUrls: ['./ngc-multioptions.component.scss'],
  providers: [MULTIOPTIONS_VALUE_ACCESSOR],
})
export class NgcMultioptionsComponent implements OnInit, ControlValueAccessor {

  @Input() options: MultioptionsItem[] = [];
  @Input() numberResultShow = 5;
  @Input() multioptionsText: MultioptionsText = MULTIOPTIONSTEXT_DEFAULT;
  @Input() class: string;
  @Input() selectedItemsList = true;
  @Input() showResultsOnInit: Boolean;
  @Output() selectOptions: EventEmitter<Array<MultioptionsItem>> = new EventEmitter<Array<MultioptionsItem>>();

  optionsSelected: MultioptionsItem[] = [];
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  selectOption(option: MultioptionsItem) {
    if (!_.find(this.optionsSelected, function(o) {if (o.id === option.id ) { return o; }})) {
      this.optionsSelected.push(option);
      this.selectOptions.emit(this.optionsSelected);
      this.onModelChange(this.optionsSelected);
    }
  }

  unSelectOption(option: MultioptionsItem) {
    _.remove(this.optionsSelected, function(o) {if (o.id === option.id ) { return o; }});
    this.selectOptions.emit(this.optionsSelected);
    this.onModelChange(this.optionsSelected);
  }

  clearSelection() {
    this.optionsSelected = [];
    this.selectOptions.emit(this.optionsSelected);
    this.onModelChange(this.optionsSelected);
  }

  writeValue(value: any): void {
    this.optionsSelected = value;
    this.selectOptions.emit(this.optionsSelected);
    this.cd.markForCheck();
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}


