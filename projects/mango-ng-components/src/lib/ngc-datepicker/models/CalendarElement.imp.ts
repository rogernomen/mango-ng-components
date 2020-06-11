import {CalendarElement} from './CalendarElement';

export class CalendarElementImp implements CalendarElement {
  private _value = 0;
  private _available = false;
  private _selected = false;
  private _today = false;

  constructor(value?: number, available?: boolean, selected?: boolean, today?: boolean) {
    this._value = value;
    this._available = available;
    this._selected = selected;
    this._today = today;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }

  get available(): boolean {
    return this._available;
  }

  set available(value: boolean) {
    this._available = value;
  }

  get selected(): boolean {
    return this._selected;
  }

  set selected(value: boolean) {
    this._selected = value;
  }

  get today(): boolean {
    return this._today;
  }

  set today(value: boolean) {
    this._today = value;
  }
}

