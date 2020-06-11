import { Component } from '@angular/core';


@Component({
  selector: 'app-ngc-selectall-checkbox-view',
  templateUrl: './ngc-selectall-checkbox-view.component.html',
  styleUrls: ['./ngc-selectall-checkbox-view.component.scss']
})
export class NgcSelectallCheckboxViewComponent {

  selectedItems: Array<string> = [];

  availableOptions1: Array<any> = [
    {id: '01-BLANCO', name: 'BLANCO', value: 'BLANCO', label: 'BLANCO'},
    {id: '20-NARANJA', name: 'NARANJA', value: 'NARANJA', label: 'NARANJA'},
    {id: '52-AZUL', name: 'AZUL', value: 'AZUL', label: 'AZUL'},
    {id: '99-NEGRO', name: 'NEGRO', value: 'NEGRO', label: 'NEGRO'}
  ];
}
