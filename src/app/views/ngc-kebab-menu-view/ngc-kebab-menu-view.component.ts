import {Component, OnInit} from '@angular/core';


@Component({
  templateUrl: './ngc-kebab-menu-view.component.html'
})

export class NgcKebabMenuViewComponent implements OnInit {

  private readonly EDIT = 0;
  private readonly DELETE = 1;

  kebabMenuItems: Array<any>;

  ngOnInit(): void {
     this.kebabMenuItems = [
      {
        id: this.EDIT,
        title: 'Editar'
      },
      {
        id: this.DELETE,
        title: 'Eliminar'
      }
    ];

  }

  kebabMenuOptionSelect(event) {
    console.log('on selecect kebab menu value', event);
  }
}
