
import { AttachInfo } from '../models/attach-info.class';
import { AttachFile } from '../models/attach-file.class';
import { Component, Input, EventEmitter, Output, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const ATTACHFILES_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcAttachFilesComponent),
  multi: true
};

@Component({
  selector: 'ngc-attach-files',
  templateUrl: './ngc-attach-files.component.html',
  styleUrls: ['./ngc-attach-files.component.scss'],
  providers: [ATTACHFILES_VALUE_ACCESSOR]
})
export class NgcAttachFilesComponent {

  @Input() attachInfo: AttachInfo;
  @Input() isSingleUpload: boolean;

  selectedFiles: Array<AttachFile>;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor() {
    this.selectedFiles = [];
  }

  onFileSelected(event: any) {
    this.addFiles(event.target.files);
    event.target.value = '';
  }

  onFileDropped(fileList: Array<File>) {
    if (this.isSingleUpload) {
      this.addFiles([fileList[0]]);
    } else {
      this.addFiles(fileList);
    }
  }

  closeFile(fileSel) {
    const removeIndex = this.selectedFiles.indexOf(fileSel);
    this.removeFile(removeIndex);
  }

  private addFiles(files: FileList | Array<File>) {
    const attachFiles: Array<AttachFile> = Array.from(files).map(function(file) {
      return new AttachFile(file, false, undefined);
    });

    this.selectedFiles = this.selectedFiles.concat(attachFiles);
    this.changeSelectedFiles();

  }

  private removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.changeSelectedFiles();
  }

  changeSelectedFiles() {
    this.onModelChange(this.selectedFiles);
  }

  writeValue(selectedFiles: Array<AttachFile>): void {
    if (selectedFiles) {
      this.selectedFiles = selectedFiles;
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

}
