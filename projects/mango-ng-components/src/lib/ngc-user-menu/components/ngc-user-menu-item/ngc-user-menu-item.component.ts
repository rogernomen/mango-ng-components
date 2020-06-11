import {Component, Input} from '@angular/core';
import {UserMenuItem} from '../../models/UserMenuItem.class';
@Component({
  selector: 'ngc-user-menu-item',
  templateUrl: './ngc-user-menu-item.component.html',
  styleUrls: ['./ngc-user-menu-item.component.scss']
})

export class NgcUserMenuItemComponent {
  @Input() item: UserMenuItem;
}
