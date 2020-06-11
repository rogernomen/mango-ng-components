import {Component, OnInit} from '@angular/core';
import {UserMenu} from '../../../../projects/mango-ng-components/src/lib/ngc-user-menu/models/UserMenu.class';

@Component({
  selector: 'ngc-user-menu-view',
  templateUrl: './ngc-user-menu-view.component.html',
  styleUrls: ['./ngc-user-menu-view.component.scss']
})

export class NgcUserMenuViewComponent implements OnInit {
  menuModel: UserMenu;

  ngOnInit() {
    this.menuModel = {
      head: {
        value: 'User Name',
        iconSrc: 'iconSrc'
      },
      items: [{
        sectionTitle: 'Section Title',
        children: [{
          label: 'Router link',
          routerLink: '/google.es'
        }, {
          label: 'On click',
          onClick: this.clickItem
        }]
      }, {
        sectionTitle: 'Section 2',
        children: [{
          label: 'Router link',
          routerLink: '/google.es',
          icon: './assets/icons/icon_logout.svg',
          children: [{
            label: 'Router link',
            routerLink: '/google.es',
            icon: './assets/icons/icon_logout.svg'
          }]
        }, {
          label: 'On click',
          onClick: this.clickItem
        }]
      }]
    };
  }

  private clickItem() {
    console.log('has been clicked');
  }
}
