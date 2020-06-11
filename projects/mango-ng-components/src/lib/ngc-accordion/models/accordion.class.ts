export class Accordion {
  id: string;
  isContentShown: boolean;
  closeAfterOpenOther: boolean;

  constructor(id: string, isContentShown: boolean = false, closeAfterOpenOther: boolean = false) {
    this.id = id;
    this.isContentShown = isContentShown;
    this.closeAfterOpenOther = closeAfterOpenOther;
  }
}
