import {RangeCalendar} from './RangeCalendar';

export class RangeCalendarImp implements RangeCalendar {

  private _isRangeCalendar = false;
  private _isFirstRangeDateSelected = false;
  private _startRangeDate: string = undefined;
  private _endRangeDate: string = undefined;

  constructor(isRangeCalendar?: boolean, isFirstRangeDateSelected?: boolean, startRangeDate?: string, endRangeDate?: string) {
    this._isRangeCalendar = isRangeCalendar;
    this._isFirstRangeDateSelected = isFirstRangeDateSelected;
    this._startRangeDate = startRangeDate;
    this._endRangeDate = endRangeDate;
  }

  get isRangeCalendar(): boolean {
    return this._isRangeCalendar;
  }

  set isRangeCalendar(value: boolean) {
    this._isRangeCalendar = value;
  }

  get isFirstRangeDateSelected(): boolean {
    return this._isFirstRangeDateSelected;
  }

  set isFirstRangeDateSelected(value: boolean) {
    this._isFirstRangeDateSelected = value;
  }

  get startRangeDate(): string {
    return this._startRangeDate;
  }

  set startRangeDate(value: string) {
    this._startRangeDate = value;
  }

  get endRangeDate(): string {
    return this._endRangeDate;
  }

  set endRangeDate(value: string) {
    this._endRangeDate = value;
  }
}
