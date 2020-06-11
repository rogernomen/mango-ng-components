import { Component } from '@angular/core';

@Component({
  selector: 'ngc-checkbox-view',
  templateUrl: './ngc-checkbox-view.component.html',
  styleUrls: ['./ngc-checkbox-view.component.scss']
})
export class NgcCheckboxViewComponent {
  basicSelectedValues = [];
  preselectedValues = ['Woman', 'Man'];
  inlineValues = ['Woman', 'Man'];
}

