import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngc-user-menu-head',
  templateUrl: './ngc-user-menu-head.component.html',
  styleUrls: ['./ngc-user-menu-head.component.scss']
})

export class NgcUserMenuHeadComponent {
  @Input() value: string;
  @Input() iconSrc: string;
}
