import { Component, OnInit } from '@angular/core';
import { MultioptionsItem } from 'projects/mango-ng-components/src/lib/ngc-multioptions/models/multioptions-item.model';
import { MultioptionsText } from '../../../../projects/mango-ng-components/src/lib/ngc-multioptions/models/multioptions-text';
import { MultiOptionsItemComponent } from './multi-options-item/multi-options-item.component';


@Component({
  selector: 'app-ngc-mulioptions-view',
  templateUrl: './ngc-mulioptions-view.component.html',
  styleUrls: ['./ngc-mulioptions-view.component.scss']
})
export class NgcMulioptionsViewComponent implements OnInit {

  selectedOptions: MultioptionsItem[] = [];

  availableOptions: MultioptionsItem[] = [
    {id: '01-BLANCO', text: 'BLANCO'},
    {id: '12-AMARILLO', text: 'AMARILLO',   dinamicContent: { component: MultiOptionsItemComponent, data: { text: ' amarillo ', rgb: '(255,255,000)' } }},    
    {id: '20-NARANJA', text: 'NARANJA'},
    {id: '52-AZUL', text: 'AZUL'},
    {id: '99-NEGRO', text: 'NEGRO'}
  ];

  multioptionsText: MultioptionsText = {
    'searchResults' : 'resultados',
    'clearSelection' : 'Quitar selección',
    'placeholder' : 'Buscar'
  };

  html = `
  <ngc-multioptions
    [options]="availableOptions"
    [(ngModel)]="selectedOptions"
    [multioptionsText]="multioptionsText">
  </ngc-multioptions>
  `

  ts = `
  availableOptions: MultioptionsItem[] = [
    {id: '01-BLANCO', text: 'BLANCO'},
    {id: '12-AMARILLO', text: 'AMARILLO',  
     dinamicContent: { component: MultiOptionsItemComponent, 
                      data: { text: ' amarillo ', rgb: '(255,255,000)' } }},        
    {id: '20-NARANJA', text: 'NARANJA'},
    {id: '52-AZUL', text: 'AZUL'},
    {id: '99-NEGRO', text: 'NEGRO'}
  ];
  selectedOptions: MultioptionsItem[] = [];  
  multioptionsText: MultioptionsText = { 
    'searchResults' : 'resultados', 
    'clearSelection' : 'Quitar selección',
    'placeholder' : 'Buscar'};
  `

  constructor() { }

  ngOnInit() {
  }

}
