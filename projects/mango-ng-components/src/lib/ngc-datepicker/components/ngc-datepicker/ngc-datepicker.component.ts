import {Component, OnInit, Input, ElementRef, Renderer, Output, EventEmitter, forwardRef, Inject} from '@angular/core';
import * as momentImported from 'moment'; const moment = momentImported;
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {CalendarElement} from '../../models/CalendarElement';
import {DATEPICKER_MODULE_CONSTANTS} from '../../ngc-datepicker.module.config';
import {TodayDate} from '../../models/TodayDate';
import {CalendarElementImp} from '../../models/CalendarElement.imp';
import {TodayDateImp} from '../../models/TodayDate.imp';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgcDatepickerComponent),
  multi: true
};


@Component({
  selector: 'ngc-datepicker',
  templateUrl: './ngc-datepicker.component.html',
  styleUrls: ['./ngc-datepicker.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class NgcDatepickerComponent implements  OnInit, ControlValueAccessor {

  @Input() validDateRegEx: RegExp;
  @Input() dateFormat: string;
  @Input() classInput: string;
  @Input() popupCalendarClass: string;
  @Input() placeholder = DATEPICKER_MODULE_CONSTANTS.CONSTANTS.PLACEHOLDER;
  @Input() minDate?: Date;
  @Input() maxDate?: Date;
  @Input() readOnly: boolean;
  @Output() onSelectedDate: EventEmitter<any> = new EventEmitter<any>();


  localeString = DATEPICKER_MODULE_CONSTANTS.CONSTANTS.LOCALE;
  viewDate: any;
  headerCalendar: string;
  weekDaysHeaderArray: Array<string> = [];
  grid: Array<CalendarElement> = [] ;
  dateValue: string;
  todayObject: TodayDate;
  showCalendar: boolean;
  documentClickListener: any;
  invalid: boolean;

  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = () => { };

  constructor(private element: ElementRef,
    private renderer: Renderer) {
    this.initDefaultValues();
  }

  ngOnInit() {
    moment.locale(this.localeString);
    this.viewDate = moment();
    this.todayObject = new TodayDateImp(this.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.DAY),
        this.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.MONTH),
        this.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.YEAR));
    this.setCalendar();
    this.showCalendar = false;
  }

  changeMonth(num) {
    this.viewDate.add(num, DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.MONTH);
    this.headerCalendar = this.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.FORMAT);
    this.buildGrid();
  }

  private buildHeader() {
    this.weekDaysHeaderArray = [];
    const weekArray: Array<number> = [0, 1, 2, 3, 4, 5, 6];
    weekArray.forEach(day => {
      this.weekDaysHeaderArray.push(moment().weekday(day).format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.WEEK_DAY).slice(0, 3));
    });
  }

  private buildGrid() {
    this.grid = [];
    const viewDate = moment(this.viewDate);
    const monthYearObject = {
      'month': +viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.MONTH),
      'year': +viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.YEAR)
    };
    const firstWeekDay = viewDate.startOf(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.MONTH).weekday();
    const lastWeekDay = viewDate.endOf(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.MONTH).weekday();
    const initEmptyDays = firstWeekDay;
    const lastEmptyDays = 6 - lastWeekDay;
    const daysInMonth = viewDate.daysInMonth();
    const arrayCompleteLength = initEmptyDays + lastEmptyDays + daysInMonth;
    let value = 0;
    let available = false;
    let today = false;

    for (let i = 0; i < arrayCompleteLength; i++) {
      if (i < initEmptyDays || i > initEmptyDays + daysInMonth - 1) {
        value = 0;
        available = false;
      } else {
        value = i - initEmptyDays + 1;
        available = this.getDayAvailability(value, monthYearObject.month);
        today = i - initEmptyDays + 1 === parseInt(this.todayObject.day, 10) &&
          monthYearObject.month === parseInt(this.todayObject.month, 10) &&
          monthYearObject.year === parseInt(this.todayObject.year, 10);
      }
      this.grid.push(new CalendarElementImp(value, available, false, today));
    }
  }

  private setCalendar() {
    this.headerCalendar = this.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.FORMAT);
    this.buildHeader();
    this.buildGrid();
  }

  private resetCalendar() {
    this.setCalendar();
    this.onChangeCallback(null);
    this.showHideCalendar(false);
  }

  selectDate(day: any, hideCalendar: boolean): any {
    if (!day.available) {
      return false;
    }

    const returnDate = moment(this.viewDate);

    this.grid.forEach((item) => {
      item.selected = item.value === day.value && item.available;
    });

    this.dateValue = returnDate.date(day.value).format(this.dateFormat);
    this.onChangeCallback(this.dateValue);
    this.onSelectedDate.emit(this.dateValue);
    this.showHideCalendar(hideCalendar);
  }

  showHideCalendar(show) {
    this.showCalendar = show;
    if (show) {
      this.bindDocumentClickListener();
    } else {
      this.unbindDocumentClickListener();
    }
  }

  private bindDocumentClickListener() {
    if (!this.documentClickListener) {
        this.documentClickListener = this.renderer.listenGlobal('document', 'click', (event) => {
          this.hideDropdownEvent(event);
        });
    }
  }

  private unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  dateChanged() {
    if (this.dateValue) {
      if (this.checkDateValidFormat(this.dateValue)) {
        this.dateValue = moment(this.dateValue, this.dateFormat).format(this.dateFormat)

        const dateObj = moment(this.dateValue, this.dateFormat);

        if (dateObj.isValid()) {
          this.invalid = false;
          this.viewDate = dateObj;
          this.setCalendar();

          const calendarElement = new CalendarElementImp(parseInt(dateObj.format('D'), 10),
            this.getDayAvailability(parseInt(dateObj.format('D'), 10), parseInt(dateObj.format('M'), 10)));
          this.selectDate(calendarElement, false);
        }
      } else if (this.dateValue === '') {
        this.invalid = false;
        this.onChangeCallback(this.dateValue);
        //this.selectDate(new CalendarElementImp(), false);
        this.onSelectedDate.emit(this.dateValue);
      } else {
        this.invalid = true;
        this.resetCalendar();
      }
    }
  }

  writeValue(date) {
    console.log('cambia');
    this.dateValue = date;
    this.dateChanged();
    /*
    if (moment(this.dateValue, DATEPICKER_MODULE_CONSTANTS.CONSTANTS.RETURN_DATE.FORMAT).isValid()) {
      this.dateValue = date;
      this.dateChanged();
    } else {
      this.resetCalendar();
    }
    */
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  private initDefaultValues() {
    this.validDateRegEx = this.validDateRegEx ? this.validDateRegEx : DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.REGEX;
    this.dateFormat = this.dateFormat && this.dateFormat.length > 0 ?
      this.dateFormat : DATEPICKER_MODULE_CONSTANTS.CONSTANTS.RETURN_DATE.FORMAT;
  }


  private hideDropdownEvent(event) {
    if (!this.element.nativeElement.contains(event.target)) {
      this.showCalendar = false;
      this.unbindDocumentClickListener();
    }
  }

  private getDayAvailability(day: number, month: number): boolean {
    if (this.minDate instanceof Date && this.maxDate instanceof Date) {
      if (month >= this.minDate.getMonth() && month <= this.maxDate.getMonth()) {
        return day >= this.minDate.getDate() && day <= this.maxDate.getDate();
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  private checkDateValidFormat(date) {
      const regex = new RegExp(this.validDateRegEx);
      return regex.test(date);
  }

}
