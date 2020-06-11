import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { NgcAccordionService } from '../../services/service/accordion.service';
import { Subscription } from 'rxjs';
import { Accordion } from '../../models/accordion.class';
@Component({
  selector: 'ngc-accordion',
  templateUrl: './ngc-accordion.component.html',
  styleUrls: ['./ngc-accordion.component.scss']
})
export class NgcAccordionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() accordionId: string;
  @Input() closeAfterOpenOther: boolean;
  @Input() accordionShowName: string;
  @Output() expand: EventEmitter<string> = new EventEmitter();
  @Output() collapse: EventEmitter<string> = new EventEmitter();

  isContentShown: boolean;
  subscriptionAccordionService$: Subscription;

  constructor(private accordionService: NgcAccordionService) {
    this.isContentShown = false;
  }

  ngOnInit(): void {
    this.accordionService.setAccordionMap(this.accordionId, this.closeAfterOpenOther);

    this.subscriptionAccordionService$ = this.accordionService.getAccordionMap().subscribe(
    (accordionMap: Map<string, Accordion>) => {
      const accordion: Accordion = accordionMap.get(this.accordionId);

      if (accordion) {
        this.isContentShown = accordion.isContentShown;
      }

    });
  }

  toggleShowContent() {
    // Delay time of 100ms to avoid problems with CSS animation duration
    // TODO: Use Angular animate instead or find another solution
    if (this.isContentShown) {
      this.accordionService.close(this.accordionId);
      setTimeout( () => this.collapse.emit(this.accordionId), 100 );
    } else {
      this.accordionService.open(this.accordionId);
      setTimeout( () => this.expand.emit(this.accordionId), 100 );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.closeAfterOpenOther && this.accordionId) {
      this.accordionService.setAccordionMap(this.accordionId, this.closeAfterOpenOther);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionAccordionService$.unsubscribe();
  }
}
