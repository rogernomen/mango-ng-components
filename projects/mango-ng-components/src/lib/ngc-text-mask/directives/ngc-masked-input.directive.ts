import {
  Directive, Provider, forwardRef, HostListener, ElementRef, Input, OnChanges, Renderer2, Optional, Inject, SimpleChanges
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { createTextMaskInputElement } from 'text-mask-core/dist/textMaskCore';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';

export class TextMaskConfig {
  mask: Array<string | RegExp> | ((raw: string) => Array<string | RegExp>) | false;
  guide?: boolean;
  placeholderChar?: string;
  pipe?: (conformedValue: string, config: TextMaskConfig) => false | string | object;
  keepCharPositions?: boolean;
  showMask?: boolean;
}

export const MASKEDINPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcMaskedInputDirective),
  multi: true
};

/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function _isAndroid(): boolean {
  const userAgent = getDOM() ? getDOM().getUserAgent() : '';
  return /android (\d+)/.test(userAgent.toLowerCase());
}

@Directive({
  selector: '[ngcTextMask]',
  exportAs: 'ngcTextMask',
  providers: [MASKEDINPUT_VALUE_ACCESSOR]
})
export class NgcMaskedInputDirective implements ControlValueAccessor, OnChanges {
  private textMaskInputElement: any;
  private inputElement: HTMLInputElement;

  /** Whether the user is creating a composition string (IME events). */
  private _composing = false;

  @Input('ngcTextMask') textMaskConfig: TextMaskConfig = {
    mask: [],
    guide: true,
    placeholderChar: '_',
    pipe: undefined,
    keepCharPositions: false,
  };

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    @Optional() @Inject(COMPOSITION_BUFFER_MODE)private _compositionMode: boolean
  ) {
    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._setupMask(true);
    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(this.inputElement.value);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    this._handleInput(event.target.value);
  }

  @HostListener('blur')
  onblur() {
    this.onTouched();
  }

  @HostListener('compositionstart')
  onCompositionstart() {
    this._compositionStart();
  }

  @HostListener('compositionend', ['$event'])
  onCompositionend(event: any) {
    this._compositionEnd(event.target.value);
  }

  writeValue(value: any) {
    this._setupMask();

    // set the initial value for cases where the mask is disabled
    const normalizedValue = value == null ? '' : value;
    this._renderer.setProperty(this.inputElement, 'value', normalizedValue);

    if (this.textMaskInputElement !== undefined) {
      this.textMaskInputElement.update(value);
    }
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  _handleInput(value) {
    if (!this._compositionMode || (this._compositionMode && !this._composing)) {
      this._setupMask();

      if (this.textMaskInputElement !== undefined) {
        this.textMaskInputElement.update(value);
        // get the updated value
        value = this.inputElement.value;
        this.onChange(value);
      }
    }
  }

  _setupMask(create = false) {
    if (!this.inputElement) {
      if (this._elementRef.nativeElement.tagName.toUpperCase() === 'INPUT') {
        // `textMask` directive is used directly on an input element
        this.inputElement = this._elementRef.nativeElement;
      } else {
        // `textMask` directive is used on an abstracted input element, `md-input-container`, etc
        this.inputElement = this._elementRef.nativeElement.getElementsByTagName('INPUT')[0];
      }
    }

    if (this.inputElement && create) {
      this.textMaskInputElement = createTextMaskInputElement(
        Object.assign({inputElement: this.inputElement}, this.textMaskConfig)
      );
    }

  }

  _compositionStart(): void { this._composing = true; }

  _compositionEnd(value: any): void {
    this._composing = false;
    if (this._compositionMode) { this._handleInput(value); }
  }
}


