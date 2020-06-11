import {TodayDate} from './TodayDate';

export class TodayDateImp implements TodayDate {


  private _day: string = undefined;
  private _month: string = undefined;
  private _year: string = undefined;

  constructor(day?: string, month?: string, year?: string) {
    this._day = day;
    this._month = month;
    this._year = year;
  }


  get day(): string {
    return this._day;
  }

  set day(value: string) {
    this._day = value;
  }

  get month(): string {
    return this._month;
  }

  set month(value: string) {
    this._month = value;
  }

  get year(): string {
    return this._year;
  }

  set year(value: string) {
    this._year = value;
  }
}
