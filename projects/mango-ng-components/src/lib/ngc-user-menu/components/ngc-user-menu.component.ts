import {Component, Input} from '@angular/core';
import {UserMenuItem} from '../models/UserMenuItem.class';
import {UserMenuHead} from '../models/UserMenuHead.class';

@Component({
  selector: 'ngc-user-menu',
  templateUrl: './ngc-user-menu.component.html',
  styleUrls: ['./ngc-user-menu.component.scss']
})

export class NgcUserMenuComponent {
  @Input() items: Array<UserMenuItem>;
  @Input() head: UserMenuHead;

}
