import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, OnDestroy } from '@angular/core';
import { DropdownListElement } from '../models/dropdownList.model';

@Component({
  selector: 'ngc-inline-dropdown',
  templateUrl: './ngc-inline-dropdown.component.html',
  styleUrls: ['./ngc-inline-dropdown.component.scss']
})
export class NgcInlineDropdownComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() selectedOption: string;
  @Input() options: Array<DropdownListElement>;
  @Output() clickOption: EventEmitter<string> = new EventEmitter<string>();
  dropdownVisible = false;
  documentClick: any;

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef) {}

  ngOnInit() {
    this.listenDocumentClick();
  }

  ngOnDestroy() {
    if (this.documentClick) {
      this.documentClick();
      this.documentClick = null;
    }
  }

  orderBy(optionSelected: DropdownListElement): void {
    this.selectedOption = optionSelected.label;
    this.clickOption.emit(optionSelected.value);
    this.toggleDropdownVisibility();
  }


  toggleDropdownVisibility(): void {
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

}
