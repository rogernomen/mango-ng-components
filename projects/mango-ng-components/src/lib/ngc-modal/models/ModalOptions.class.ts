export class ModalOptions {
  title?: string;
  isFullScreen?: boolean;
  sizeClasses?: string;
  backgroundImage?: String;

  constructor(title?: string, isFullScreen?: boolean, sizeClasses?: string, backgroundImage?: String) {
    this.title = title;
    this.isFullScreen = isFullScreen;
    this.sizeClasses = sizeClasses;
    this.backgroundImage = backgroundImage;
  }
}
