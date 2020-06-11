import {Component} from '@angular/core';
@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})

export class ModalContentComponent {
  text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eleifend euismod enim sed elementum. ' +
    'Nam eget quam mi. Suspendisse imperdiet risus non libero vulputate, ac mollis odio rhoncus. Interdum et malesuada ' +
    'fames ac ante ipsum primis in faucibus. Curabitur nisi sapien, accumsan a ligula eu, maximus tempor nibh. ' +
    'Phasellus accumsan et sem sed bibendum. Nunc sed ex venenatis, sagittis turpis eget, luctus erat. Nullam eu ' +
    'lorem pretium, dictum eros vitae, pulvinar arcu. Vivamus facilisis ullamcorper porttitor. Fusce malesuada ' +
    'turpis tempor dapibus rutrum. In purus ligula, venenatis facilisis leo quis, rhoncus efficitur diam.';
}
