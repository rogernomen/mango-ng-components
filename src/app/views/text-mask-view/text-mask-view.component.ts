import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-text-mask-view',
  templateUrl: './text-mask-view.component.html',
  styleUrls: ['./text-mask-view.component.css']
})
export class TextMaskViewComponent implements OnInit {
  ts: string;
  html: string;
  form: FormGroup;
  phoneMask: Array<string | RegExp>;
  dateMask: Array<string | RegExp>;

  constructor(private fb: FormBuilder) {
    this.ts = `  ngOnInit() {
      this.form = this.fb.group(
        {
          'phoneField': ['1234567890'],
          'dateField1': ['01/11/2019'],
          'dateField2': ['2019-11-01']
        }
      );
      this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
      this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }
    `;
    this.html = ` 
    <form [formGroup]="form" (submit)="save()">                                
        <p class="u-mb-5">Example NgcTextMask Directive</p>
        <div class="u-mb-8">
            <input [ngcTextMask]="{mask: phoneMask}" type="text" formControlName="phoneField"/>
        </div>
        <p class="u-mb-5">Example NgcTextMask Directive</p>
        <div class="u-mb-8">
            <input 
                formControlName="dateField1"
                [ngcTextMask]="{mask: dateMask, placeholderChar: ' ', keepCharPositions: true}" 
                type="text"
            />
            {{form.get('dateField1').value}}
        </div>                                
        <p>Example NgcLocaleDateMask Component</p>
        <div class="u-mb-8">
            <ngc-locale-date-mask 
                formControlName="dateField2"
                language="es-ES"
                [hasError]="false"
                [editionDisabled]="false"
            ></ngc-locale-date-mask>
            {{form.get('dateField2').value}}
        </div>                           
    </form>
    `;
  }

  ngOnInit() {
    this.form = this.fb.group(
      {
        'phoneField': ['1234567890'],
        'dateField1': ['01/11/2019'],
        'dateField2': ['2019-11-01']
      }
    );
    this.phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  }

}
