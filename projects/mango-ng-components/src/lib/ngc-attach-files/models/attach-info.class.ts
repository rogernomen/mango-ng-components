

export class AttachInfo {
    header: string;
    subHeader: string;
    dragOver: string;

    constructor(header: string, subHeader: string, dragOver: string) {
      this.header = header;
      this.subHeader = subHeader;
      this.dragOver = dragOver;
    }
}
