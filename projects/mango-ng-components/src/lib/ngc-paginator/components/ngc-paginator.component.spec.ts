import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NgcPaginatorComponent} from './ngc-paginator.component';
import {PAGINATOR_MODULE_CONFIG, PAGINATOR_MODULE_CONSTANTS} from '../ngc-paginator.module.config';


describe('NgcPaginatorComponent', () => {
  let component: NgcPaginatorComponent;
  let fixture: ComponentFixture<NgcPaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgcPaginatorComponent],
      providers: [
        {provide: PAGINATOR_MODULE_CONFIG, useValue: PAGINATOR_MODULE_CONSTANTS}
      ]
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('when component inits', () => {
    it('should build the paginator without splitting the pages', () => {
        component.totalPages = 4;
        component.actualPage = 1;
        component.ngOnInit();

        expect(component.pages).toEqual([1, 2, 3, 4]);
    });

    it('should build the paginator showing there are more pages in the end part of paginator', () => {
        component.totalPages = 10;
        component.actualPage = 1;
        component.ngOnInit();


        expect(component.pages).toEqual([1, 2, 3, 4, 5]);
        expect(component.morePagesOnRightSide).toBeTruthy();
    });

    it('should build the paginator showing there are more pages in the first part of the paginator', () => {
        component.totalPages = 10;
        component.actualPage = 10;
        component.ngOnInit();

        expect(component.pages).toEqual([5, 6, 7, 8, 9, 10]);
        expect(component.morePagesOnLeftSide).toBeTruthy();
    });

    it('shoujld build the paginator showing there are more pages in the first and end part of the paginator', () => {
      component.totalPages = 20;
      component.actualPage = 10;
      component.ngOnInit();

      expect(component.pages).toEqual([8, 9, 10, 11, 12]);
      expect(component.morePagesOnLeftSide).toBeTruthy();
      expect(component.morePagesOnRightSide).toBeTruthy();
    });
  });

  it('should go to a previous page when onClickPreviusItem method has been called', () => {
      component.totalPages = 20;
      component.actualPage = 10;
      component.ngOnInit();
      component.onClickPreviusItem();

      expect(component.pages).toEqual([7, 8, 9, 10, 11]);
      expect(component.actualPage).toBe(9);
  });

  it('should go to the next page when method onClickNextItem has been called', () => {
    component.totalPages = 20;
    component.actualPage = 10;
    component.ngOnInit();

    component.onClickNextItem();
    expect(component.pages).toEqual([9, 10, 11, 12, 13]);
    expect(component.actualPage).toBe(11);
  });

  it('should change page when onClickItem method has been called', () => {
    component.totalPages = 20;
    component.actualPage = 10;
    component.ngOnInit();

    component.onClickItem(11);
    expect(component.pages).toEqual([9, 10, 11, 12, 13]);
    expect(component.actualPage).toBe(11);
  });
});
