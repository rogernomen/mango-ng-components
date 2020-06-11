import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { MultioptionsItem, MultioptionsText, MULTIOPTIONSTEXT_DEFAULT } from '../../../models';
import * as _ from 'lodash';

@Component({
  selector: 'ngc-multioptions-results',
  templateUrl: './ngc-multioptions-results.component.html',
  styleUrls: ['./ngc-multioptions-results.component.scss']
})
export class NgcMultioptionsResultsComponent implements OnInit, OnDestroy {

  @Input() options: MultioptionsItem[];
  @Input() optionsSelected: MultioptionsItem[];
  @Input() multioptionsText: MultioptionsText = MULTIOPTIONSTEXT_DEFAULT;
  @Input() showResultsOnInit: Boolean;
  @Input() class: string;
  @Output() selectOption: EventEmitter<MultioptionsItem> = new EventEmitter<MultioptionsItem>();
  @Output() unSelectOption: EventEmitter<MultioptionsItem> = new EventEmitter<MultioptionsItem>();

  filterBy = '';
  optionsSearched: MultioptionsItem[] = [];
  optionsSearchedVisible = false;
  documentClick;

  constructor(private _eref: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (this.showResultsOnInit) {
      this.onFocusInput();
    }
  }

  ngOnDestroy() {
    if (this.documentClick) {
      this.documentClick();
      this.documentClick = null;
    }
  }

  onFocusInput(event?) {
    if (!this.optionsSearchedVisible && this.options) {
      this.showOptionsSearched(this.options);
    }
  }

  onChangeFilterBy(newValue: string) {
    this.filterBy = newValue;

    if (this.filterBy && this.filterBy.length > 0 && this.options) {
      const optionsSearched: MultioptionsItem[] = this.options.filter((item: MultioptionsItem) =>
        item.text.toLocaleLowerCase().indexOf(this.filterBy.toLocaleLowerCase()) !== -1
      );
      this.showOptionsSearched(optionsSearched);
    } else {
      this.hideOptionsSearched();
    }
  }

  showOptionsSearched(options: MultioptionsItem[]) {
    this.optionsSearched = options;
    this.optionsSearchedVisible = true;

    if (!this.documentClick) {
      this.documentClick = this.renderer.listen('document', 'click', (evt) => {
        if (!this._eref.nativeElement.contains(evt.target)) {
          this.clearFilter();
        }
      });
    }
  }

  hideOptionsSearched() {
    this.optionsSearched = [];
    this.optionsSearchedVisible = false;

    if (this.documentClick) {
      this.documentClick();
      this.documentClick = null;
    }
  }

  clearFilter() {
    this.filterBy = '';
    this.hideOptionsSearched();
  }

  optionSelected(optionId: string) {
    return (_.find(this.optionsSelected, function(o) {if (o.id === optionId ) { return o; }}));
  }

  selectOptionEmit(event) {
    this.selectOption.emit(event);
  }

  unSelectOptionEmit(event) {
    this.unSelectOption.emit(event);
  }
}
