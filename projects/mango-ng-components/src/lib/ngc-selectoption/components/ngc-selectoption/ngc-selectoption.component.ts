import {
  Component, OnInit, EventEmitter, Output, ChangeDetectorRef, forwardRef, OnDestroy, Renderer2, ElementRef,
  Input, ContentChildren, QueryList
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgcSelectoptionItemComponent } from '../ngc-selectoption-item/ngc-selectoption-item.component';
import { SelectoptionService } from '../../services/selectoption.service';
import { Subscription } from 'rxjs';
import { SELECTOPTIONTEXT_DEFAULT, SelectoptionText } from '../../models/SelectoptionText';

export const FILTERCOUNTRY_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcSelectoptionComponent),
  multi: true
};

@Component({
  selector: 'ngc-selectoption',
  templateUrl: './ngc-selectoption.component.html',
  styleUrls: ['./ngc-selectoption.component.scss'],
  providers: [FILTERCOUNTRY_VALUE_ACCESSOR, SelectoptionService]
})
export class NgcSelectoptionComponent implements OnInit, OnDestroy {

  @Input() selectoptionText: SelectoptionText = SELECTOPTIONTEXT_DEFAULT;
  @Output() changeSelected: EventEmitter<string> = new EventEmitter();
  @ContentChildren(NgcSelectoptionItemComponent) contentChildren !: QueryList<NgcSelectoptionItemComponent>;

  selectedText: string;
  selectedText$: Subscription;
  searchedText: string;
  documentClick;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private cd: ChangeDetectorRef,
              private renderer: Renderer2,
              private _eref: ElementRef,
              private selectoptionService: SelectoptionService) { }

  ngOnInit() {
    if (!this.documentClick) {
      this.documentClick = this.renderer.listen('document', 'click', (evt) => {
        if (!this._eref.nativeElement.contains(evt.target)) {
          if (this.searchedText !== this.selectedText) {
            this.refreshView();
          }
        }
      });
    }

    this.selectedText$ = this.selectoptionService.getSelectedText().subscribe((selectedText: string) => {
      this.updateSelectedText(selectedText);
    });
  }

  ngOnDestroy() {
    if (this.documentClick) {
      this.documentClick();
      this.documentClick = null;
    }

    this.selectedText$.unsubscribe();
  }

  refreshView() {
    this.searchedText = this.selectedText;
    this.refreshResultView();
  }

  refreshResultView() {
    this.selectoptionService.updateSearchedText(this.searchedText);
  }

  updateSelectedText(selectedText: string) {
    this.selectedText = selectedText;
    this.refreshView();
    this.onModelChange(this.selectedText);
    this.changeSelected.emit(this.selectedText);
  }

  noResults(): boolean {
    if (this.contentChildren) {
      return this.contentChildren.filter((element, index, array) => element.visible).length === 0;
    }
    return true;
  }

  writeValue(selectedText: string): void {
    this.updateSelectedText(selectedText);

    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
