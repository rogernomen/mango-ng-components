import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ComponentFactoryResolver, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { ItemDirective } from '../../../directives/item.directive';
import { MultioptionsItem } from '../../../models/multioptions-item.model';

@Component({
  selector: 'ngc-multioptions-item',
  templateUrl: './ngc-multioptions-item.component.html',
  styleUrls: ['./ngc-multioptions-item.component.scss']
})
export class NgcMultioptionsItemComponent implements OnInit, OnChanges {

  @Input() option: MultioptionsItem;
  @Input() optionSelected: boolean;
  @Output() selectOption: EventEmitter<MultioptionsItem> = new EventEmitter<MultioptionsItem>();
  @Output() unSelectOption: EventEmitter<MultioptionsItem> = new EventEmitter<MultioptionsItem>();

  @ViewChild(ItemDirective, {static: true}) adHost: ItemDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.option) {
      if (this.option.dinamicContent) {
        this.loadComponent();
      } else {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
      }
    }
  }

  selectUnselectOptions(event) {
    if (event.target.checked) {
      this.selectOption.emit(this.option);
    } else {
      this.unSelectOption.emit(this.option);
    }
  }

  private loadComponent() {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const dinamicContent = this.option.dinamicContent;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dinamicContent.component);

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<any>componentRef.instance).data = dinamicContent.data;
  }
}
