import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef, EmbeddedViewRef,
  Injectable,
  Injector,
  ViewRef,
} from '@angular/core';
import {NgcModalComponent} from '../components/ngc-modal.component';

export class ContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

@Injectable({providedIn: 'root'})
export class NgcModalService {

  static componentsRef: ComponentRef<any>[] = [];

  static close(modalRef?): void {
	  // ACLARATION: The animation is launched by .a-to-top 
	  // that has a 0.6 duration
	  const ANIMATION_TIME = 600;

	  document.body.querySelector('.c-mngModal__overflow').classList.add('a-to-top');
	  setTimeout(() => {
		if (modalRef) {
			modalRef.hostView.rootNodes[0].remove();
		} else {
			document.body.querySelector('ngc-modal').remove();
    }
    NgcModalService.blockBodyScroll(false);
    
    this.componentsRef.forEach(
      (componentRef: ComponentRef<any>) => {
        componentRef.destroy();
      }
    );
    this.componentsRef = [];

	}, ANIMATION_TIME);
    
  }

  static blockBodyScroll(hasToBeBlocked: boolean): void {
	  hasToBeBlocked ? document.body.classList.add('u-noScroll') : document.body.classList.remove('u-noScroll');
  }

  constructor(
    private _applicationRef: ApplicationRef, private _moduleCFR: ComponentFactoryResolver, private _injector: Injector) {
  }

  open(modalBody: any, modalFooter?: any, modalOtions?: any): any {
	NgcModalService.blockBodyScroll(true);
    const componentRef = this.buildModalComponent(this._moduleCFR, NgcModalComponent, this._injector);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.setModalOptions(componentRef, modalOtions);
    this.appendModalParts(modalBody, modalFooter,
      domElem, this._moduleCFR, componentRef, this._injector);

    return componentRef.instance;
  }

  private buildModalComponent(moduleCFR: ComponentFactoryResolver,
                              modalComponent: any, injector: Injector): ComponentRef<any> {
    const componentRef = this.createComponentRef(moduleCFR, modalComponent, injector);
    this._applicationRef.attachView(componentRef.hostView);

    return componentRef;
  }

  private bindCloseMethod(componentRef: ComponentRef<any>, modalRef: ComponentRef<any>): void {
    componentRef.instance.close = (value: any) => {
      modalRef.instance.modalState$.close.next(value);
      NgcModalService.close(modalRef);
    };
  }

  private appendModalParts(modalBody: any, modalFooter: any,
                           domElem: HTMLElement, moduleCFR: ComponentFactoryResolver,
                           componentRef: ComponentRef<any>, injector: Injector): void {
    if (modalBody) {
      this.buildModalBody(domElem, moduleCFR, modalBody, componentRef, injector);
    }

    if (modalFooter) {
      this.buildModalFooter(domElem, moduleCFR, modalFooter, componentRef, injector);
    } else {
      this.removeCssContainer('.c-mngModal__footer', componentRef);
    }

  }

  private buildModalBody(domElem: HTMLElement, moduleCFR: ComponentFactoryResolver,
                         modalBody: any, componentRef: ComponentRef<any>, injector: Injector): void {
    const contentRef = this._createContentFromComponentRef(moduleCFR, modalBody, componentRef, injector);
    const content = contentRef.componentRef.hostView['rootNodes'][0];
    domElem.querySelector('.c-mngModal__content').appendChild(content);
  }

  private buildModalFooter(domElem: HTMLElement, moduleCFR: ComponentFactoryResolver,
                           modalFooter: any, componentRef: ComponentRef<any>, injector: Injector): void {
      const contentRef = this._createContentFromComponentRef(moduleCFR, modalFooter, componentRef, injector);
      const content = contentRef.componentRef.hostView['rootNodes'][0];
      domElem.querySelector('.c-mngModal__footer').appendChild(content);
  }

  private _createContentFromComponentRef(moduleCFR, content: any, modalRef: ComponentRef<any>, contentInjector: Injector): ContentRef {
    const componentRef = this.createComponentRef(moduleCFR, content, Injector.create({providers: [], parent: contentInjector}));
    this.bindCloseMethod(componentRef, modalRef);
    this._applicationRef.attachView(componentRef.hostView);

    return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
  }

  private setModalOptions(componentRef: ComponentRef<any>, modalOptions: any): void {
    componentRef.instance.options = modalOptions;
  }

  private removeCssContainer(containerCssClass: string, componentRef: ComponentRef<any>): void {
    componentRef.hostView['rootNodes'][0].querySelector(containerCssClass).remove();
  }

  private createComponentRef(moduleCFR: ComponentFactoryResolver, component: any, injector: Injector): ComponentRef<any> {
    const componentFactory = moduleCFR.resolveComponentFactory(component);
    const componentRef = componentFactory.create(injector);
    NgcModalService.componentsRef.push(componentRef);
    return componentRef;
  }
}

