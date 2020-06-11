import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as momentImported from 'moment'; const moment = momentImported;

import { NgcDatepickerComponent } from './ngc-datepicker.component';
import {TodayDateImp} from '../../models/TodayDate.imp';
import {FormsModule} from '@angular/forms';
import {DATEPICKER_MODULE_CONSTANTS} from '../../ngc-datepicker.module.config';

describe('NgcDatepickerComponent', () => {
  let component: NgcDatepickerComponent;
  let fixture: ComponentFixture<NgcDatepickerComponent>;
  let mocks: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcDatepickerComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
      loadMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on init', () => {
      beforeEach(() => {
        component.ngOnInit();
      });

      it('should set initial values', () => {
        expect(component.todayObject).toEqual(mocks.todayObject);
        expect(component.dateValue).toEqual('');
        expect(component.showCalendar).toBeFalsy();
      });

      describe('when set calendar', () => {
          it('should set headerCalendar', () => {
            expect(component.headerCalendar).not.toBeUndefined();
          });

          it('should build the header calendar', () => {
            expect(component.weekDaysHeaderArray).toEqual(mocks.weekDays);
          });

          it('shold build the grid', () => {
            expect(component.grid.length === 35 || component.grid.length === 42).toBeTruthy();
            //TODO: fix test
            //expect(component.grid[0].value).toEqual(0);
            //expect(component.grid[3].value).toEqual(1);
          });
      });
  });

  it('should change the month when the method is called', () => {
    const addSpyMethod = spyOn(component.viewDate, 'add').and.callThrough();

    component.changeMonth(1);
    expect(addSpyMethod).toHaveBeenCalledWith(1, DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.MONTH);
    //TODO: fix test
    //expect(component.headerCalendar).toEqual(mocks.month);
  });

  describe('when selectDate method is called', () => {
      it('should return false when day is not available', () => {
          const result = component.selectDate({available: false}, false);
          expect(result).toBeFalsy();
      });

      it('should set the selected date', () => {
          component.selectDate(mocks.selectedDay, false);
          const selectedDay = component.grid.filter((gridDay) => gridDay.selected);
          expect(selectedDay[0].value).toEqual(mocks.selectedDay.value);
      });

      it('should set dateValue', () => {
        component.selectDate(mocks.selectedDay, false);
        expect(component.dateValue).toEqual(mocks.todayFormattedDate);
      });

      it('should hide calendar if it was opened', () => {
          component.selectDate(mocks.selectedDay, true);
          expect(component.showCalendar).toBeTruthy();
      });

      it('should emit output', () => {
          let selectedDate = '';
          component.onSelectedDate.subscribe((value) => selectedDate = value);
          component.selectDate(mocks.selectedDay, true);

          expect(selectedDate).toEqual(mocks.todayFormattedDate);
      });
  });

  describe('dateChanged method', () => {
      it('should reset calendar if the input has no correct length', () => {
        component.dateValue = 'test';
        component.headerCalendar = 'headerCalendar';
        component.dateChanged();
        expect(component.headerCalendar).toEqual(component.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.VIEW_DATE.FORMAT));
      });

      it('should set correctly date', () => {
          const spiedMethod = spyOn(component, 'selectDate').and.callThrough();
          component.ngOnInit();
          component.dateValue = mocks.testDate;
          component.dateChanged();
          expect(component.viewDate.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.RETURN_DATE.FORMAT)).toEqual(mocks.testDate);
          expect(spiedMethod).toHaveBeenCalled();
      });
  });

  function loadMocks() {
    const mmnt = moment();
    mocks = {
      todayObject: new TodayDateImp(mmnt.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.DAY),
        mmnt.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.MONTH),
        mmnt.format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.YEAR)),
      month: 'diciembre 2018',
      weekDays: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'],
      selectedDay: {value: parseInt(moment().format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.DATE_FORMATS.DAY), 10), available: true},
      todayFormattedDate: moment(new Date()).format(DATEPICKER_MODULE_CONSTANTS.CONSTANTS.RETURN_DATE.FORMAT),
      testDate: '10/10/2018'
    };
  }
});
