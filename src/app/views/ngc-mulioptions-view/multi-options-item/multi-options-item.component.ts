import { Component, OnInit, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-multi-options-item',
  templateUrl: './multi-options-item.component.html',
  styleUrls: ['./multi-options-item.component.scss']
})
export class MultiOptionsItemComponent implements OnInit {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }
}
