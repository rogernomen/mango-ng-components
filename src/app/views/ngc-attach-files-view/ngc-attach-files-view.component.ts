import { Component, OnInit } from '@angular/core';
import { AttachInfo } from 'projects/mango-ng-components/src/lib/ngc-attach-files/models/attach-info.class';
import { AttachFile } from 'projects/mango-ng-components/src/public_api';

@Component({
  selector: 'ngc-attach-files-view',
  templateUrl: './ngc-attach-files-view.component.html',
  styleUrls: ['./ngc-attach-files-view.component.scss']
})
export class NgcAttachFilesViewComponent implements OnInit {

  html: string;
  ts: string;
  attachInfo: AttachInfo;
  isSingleUpload: boolean;
  isWebDevice: boolean;
  selectedFiles: Array<AttachFile> = [];

  ngOnInit() {
    this.html = `<ngc-attach-files
    [attachInfo]="attachInfo"
    [isSingleUpload]="isSingleUpload"
    (files)="manageFiles($event)">
</ngc-attach-files>
<button (click)="setError()">Click to set error in file number 0</button>`;
    this.ts = `
      ngOnInit() {
        this.attachInfo = {
          header: 'Elije un archivo o arrástralo aquí',
          subHeader: 'Para que la carga de datos funcione correctamente respeta
          el orden de las columnas que aparecen en la plantilla de Excel.',
          dragOver: 'Coloca aquí tus ficheros'
        };
      }

      manageFiles(attachFiles: Array<AttachFile>) {
        this.selectedFiles = attachFiles;
        console.log('files received', this.selectedFiles);
      }

      setError() {
        const attachFile = this.selectedFiles[0];
        if (attachFile) {
          if (!attachFile.errorText) {
            attachFile.errorText = 'ERROR!!!!!!!!!!';
          } else {
            attachFile.errorText = '';
          }
        }
      }
    }
    `;
    this.attachInfo = {
      header: 'Elije un archivo o arrástralo aquí',
      subHeader: `Para que la carga de datos funcione correctamente respeta 
      el orden de las columnas que aparecen en la plantilla de Excel.`,
      dragOver: 'Coloca aquí tus ficheros'
    };
  }

  manageFiles(attachFiles: Array<AttachFile>) {
    this.selectedFiles = attachFiles;
    console.log('files received', this.selectedFiles);
  }

  setError() {
    const attachFile = this.selectedFiles[0];
    if (attachFile) {
      if (!attachFile.errorText) {
        attachFile.errorText = 'ERROR!!!!!!!!!!';
      } else {
        attachFile.errorText = '';
      }
    }
  }

  reset() {
    this.selectedFiles = [];
  }
}
