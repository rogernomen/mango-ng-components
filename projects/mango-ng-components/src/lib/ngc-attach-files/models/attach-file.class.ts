

export class AttachFile {
    file: File;
    validationDone: boolean;
    errorText: string;

    constructor(file: File, validationDone: boolean, errorText: string) {
      this.file = file;
      this.validationDone = validationDone;
      this.errorText = errorText;
    }
}
