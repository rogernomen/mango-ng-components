import { Component, OnInit } from '@angular/core';
import { Accordion } from 'projects/mango-ng-components/src/lib/ngc-accordion/models/accordion.class';
import { NgcAccordionService } from '../../../../projects/mango-ng-components/src/lib/ngc-accordion/services';

@Component({
  selector: 'app-ngc-accordion-view',
  templateUrl: './ngc-accordion-view.component.html',
  styleUrls: ['./ngc-accordion-view.component.scss'],
  providers: [NgcAccordionService]
})
export class NgcAccordionViewComponent implements OnInit {

  kebabMenuItems: Array<any>;
  idList: Array<string>;
  nameList: Array<string>;
  contentShownList: Array<Accordion>;
  shouldCloseAfterOpenOther: boolean;
  ts: string;
  html: string;

  constructor() {
    this.shouldCloseAfterOpenOther = true;
    this.ts = `
    this.kebabMenuItems = [
      {
        id: 'EDIT',
        title: 'Editar'
      },
      {
        id: 'DELETE',
        title: 'Eliminar'
      }
    ];
    this.accordionIdList = ['accordionId1', 'accordionId2', 'accordionId3', 'accordionId4', 'accordionId5'];
    this.accordionNameList = ['Lista 1', 'Kebab Menu', 'Lista 2', 'Lista 4', 'Lista 5'];
    `
    ;
    this.html = `
<ngc-accordion [accordionShowName]='nameList[0]' [accordionId]='idList[0]' [closeAfterOpenOther]='true'>
    <ul>
        <li>Opcion 1</li>
        <li>Opcion 2</li>
        <li>Opcion 3</li>
        <li>Opcion 4</li>
        <li>Opcion 5</li>
    </ul>
</ngc-accordion>
<ngc-accordion [accordionShowName]='nameList[1]' [accordionId]='idList[1]' [closeAfterOpenOther]='false'>                                    
    <ngc-kebab-menu [disabled]="false" [items]="kebabMenuItems"></ngc-kebab-menu>
</ngc-accordion>  
<ngc-accordion [accordionShowName]='nameList[2]' [accordionId]='idList[2]' [closeAfterOpenOther]='true'>                                    
    <ul>
        <li>Opcion 6</li>
        <li>Opcion 7</li>
        <li>Opcion 8</li>
        <li>Opcion 9</li>
        <li>Opcion 10</li>
    </ul>
</ngc-accordion> 
<ngc-accordion [accordionShowName]='nameList[3]' [accordionId]='idList[3]' [closeAfterOpenOther]='true'>                                    
        <ul>
            <li>Opcion 11</li>
            <li>Opcion 12</li>
        </ul>
</ngc-accordion>  
<ngc-accordion [accordionShowName]='nameList[4]' [accordionId]='idList[4]' [closeAfterOpenOther]='true'>                                    
    <ul>
        <li>Opcion 13</li>
        <li>Opcion 14</li>
    </ul>
</ngc-accordion>
  `;
  }

  ngOnInit() {
    this.kebabMenuItems = [
      {
        id: 'EDIT',
        title: 'Editar'
      },
      {
        id: 'DELETE',
        title: 'Eliminar'
      }
    ];
    this.idList = ['accordionId1', 'accordionId2', 'accordionId3', 'accordionId4', 'accordionId5'];
    this.nameList = ['Lista 1', 'Kebab Menu', 'Lista 2', 'Lista 4', 'Lista 5'];

  }
}
