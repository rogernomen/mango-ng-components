import {Component, Input, Output, EventEmitter, OnDestroy, ElementRef} from '@angular/core';

@Component({
    selector: 'ngc-kebab-menu',
    templateUrl: './ngc-kebab-menu.component.html',
    styleUrls: ['./ngc-kebab-menu.component.scss']
  })

  export class NgcKebabMenuComponent implements OnDestroy  {

    @Input() items: any;
    @Input() disabled = false;
    @Input() position: string;
    @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

    openKebabMenu: boolean;
    documentClickListener: any;

    constructor(
        private element: ElementRef) {}

    selectItem(item: any) {
        if (item.action) {
          item.action();
        } else {
          this.selectedItem.emit(item);
        }

        this.toggleMenu();
    }

    toggleMenu() {
        if (!this.disabled) {
          this.openKebabMenu = !this.openKebabMenu;
          if (this.openKebabMenu) {
            this.bindDocumentClickListener();
          } else {
            this.unbindDocumentClickListener();
          }
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = document.addEventListener('click', (event) => {
              this.hideCollapsibleEvent(event);
            });
        }
      }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
          this.documentClickListener();
          this.documentClickListener = null;
        }
    }

    private hideCollapsibleEvent(event) {
        if (!this.element.nativeElement.contains(event.target)) {
          this.openKebabMenu = false;
          this.unbindDocumentClickListener();
        }
      }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
      }
}



