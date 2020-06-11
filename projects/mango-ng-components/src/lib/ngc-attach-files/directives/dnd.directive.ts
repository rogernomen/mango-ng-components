import {Directive, HostListener, HostBinding, EventEmitter, Output, Input} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @Input() private allowed_extensions: Array<string> = [];
  @Output() private onFileDropped: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('class.is-mouseover') public mouseOver;
  @HostBinding('class.is-dragover') public dragOver;

  constructor() { }

  @HostListener('mouseover') public onMouseOver() {
    this.mouseOver = true;
  }

  @HostListener('mouseout') public onMouseOut() {
    this.mouseOver = false;
  }

  @HostListener('dragover', ['$event']) public onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
    const files = evt.dataTransfer.files;
    const valid_files: Array<File> = [];
    if (files.length > 0) {
      Array.from(files).forEach((file: File) => {
        const ext = file.name.split('.')[file.name.split('.').length - 1];
       valid_files.push(file);
      });
      this.onFileDropped.emit(valid_files);
    }
  }
}