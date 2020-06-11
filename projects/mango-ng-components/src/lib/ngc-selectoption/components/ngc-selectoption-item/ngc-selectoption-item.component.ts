import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SelectoptionService } from '../../services/selectoption.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngc-selectoption-item',
  templateUrl: './ngc-selectoption-item.component.html',
  styleUrls: ['./ngc-selectoption-item.component.css']
})
export class NgcSelectoptionItemComponent implements OnInit, OnDestroy {

  @Input() keyText: string;

  searchedText$: Subscription;
  visible = true;

  constructor(private selectoptionService: SelectoptionService) { }

  ngOnInit() {
    this.searchedText$ = this.selectoptionService.getSearchedText().subscribe((searchedText: string) => {
      if (this.keyText && searchedText) {
        this.visible = (this.keyText.toLowerCase().indexOf(searchedText.toLowerCase()) !== -1);
      } else {
        this.visible = true;
      }
    });
  }

  ngOnDestroy() {
    this.searchedText$.unsubscribe();
  }

  itemClick() {
    this.selectoptionService.updateSelectedText(this.keyText);
  }

}
