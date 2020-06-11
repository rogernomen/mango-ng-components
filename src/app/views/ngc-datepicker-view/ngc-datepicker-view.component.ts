import { Component } from '@angular/core';

@Component({
  selector: 'ngc-datepicker-view',
  templateUrl: './ngc-datepicker-view.component.html',
  styleUrls: ['./ngc-datepicker-view.component.scss']
})
export class NgcDatepickerViewComponent {
  html = `
  <ngc-datepicker [dateFormat]="DD-MM-YYYY" [placeholder]="vPlaceholder" [(ngModel)]="vFecha" (onSelectedDate)="onChangeDatePicker($event)"></ngc-datepicker>
  `
  ts = `
  vFecha: string;
  vPlaceholder:string ="DD/MM/AAAA";

  onChangeDatePicker(event){
    console.log(event);
  }
  `
  vFecha: string;
  vPlaceholder:string ="DD/MM/AAAA";

  regExp = /^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\d{4}$/;

  ngOnInit() {

  }

  onChangeDatePicker(event){
    console.log(event);
  }
}
