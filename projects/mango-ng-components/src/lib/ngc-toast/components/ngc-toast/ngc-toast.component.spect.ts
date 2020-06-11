import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgcToastComponent } from './ngc-toast.component';
import { Renderer2, Type } from '@angular/core';

describe('ToastDesktop', () => {
  let component: NgcToastComponent;
  let fixture: ComponentFixture<NgcToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add class when toastAnimationLeave is called', () => {
    const renderer2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    const spiedRenderer = spyOn(renderer2, 'addClass').and.callThrough();
    component.toastAnimationLeave('test');

    expect(spiedRenderer).toHaveBeenCalled();
  });
});
