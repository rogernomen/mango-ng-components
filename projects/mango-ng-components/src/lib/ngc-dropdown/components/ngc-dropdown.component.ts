import {
  Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, OnInit, Output,
  Renderer2
} from '@angular/core';
import {DropdownService} from '../services/dropdown.service';
import {Subscription} from 'rxjs/index';
import {DropdownListElement} from '../ngc-dropdown-list/models/dropdownList.model';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ngc-dropdown',
  templateUrl: './ngc-dropdown.component.html',
  styleUrls: ['./ngc-dropdown.component.scss'],
  providers: [{
    provide: DropdownService, useClass: DropdownService
  }, {provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgcDropdownComponent),
      multi: true
  }]
})

export class NgcDropdownComponent implements OnInit, OnDestroy {
  @Output() selectEvent: EventEmitter<any> = new EventEmitter(null);
  @Input() config: any;
  @Input() ngModel: any;

  selectedValue: any;
  dropdownVisible = false;
  documentClick: any;
  registeredDropdowns$: Subscription;

  constructor(private renderer: Renderer2,
              @Inject(DropdownService) private dropdownService: DropdownService,
              private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.listenElementSelectEvent();
    this.listenDocumentClick();
    this.selectedValue = this.ngModel;
  }

  ngOnDestroy(): void {
    this.registeredDropdowns$.unsubscribe();
  }

  onClickInput(): void {
    this.toggleDropdownVisibility();
  }

  onModelChange: Function = () => {
    this.selectedValue = this.ngModel;
  };
  onModelTouched: Function = () => { };
  writeValue(value: any): void {
    this.selectedValue = value || '';
  }
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  private toggleDropdownVisibility(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  private listenDocumentClick(): void {
    this.documentClick = this.renderer.listen('document', 'click', (event) => this.hideDropdownContentWhenClickOut(event));
  }

  private hideDropdownContentWhenClickOut(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      if (this.dropdownVisible) {
        this.toggleDropdownVisibility();
      }
    }
  }

  private listenElementSelectEvent() {
    this.registeredDropdowns$ = this.dropdownService.getCurrentValue().subscribe((currentValue: DropdownListElement) => {
      if (currentValue) {
        this.onModelChange(currentValue.label);
        this.selectEvent.emit(currentValue);
        this.selectedValue = currentValue.label;
        this.toggleDropdownVisibility();
      }
    });
  }
}
