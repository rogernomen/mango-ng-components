import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiOptionsItemComponent } from './multi-options-item.component';

describe('MultiOptionsItemComponent', () => {
  let component: MultiOptionsItemComponent;
  let fixture: ComponentFixture<MultiOptionsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiOptionsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiOptionsItemComponent);
    component = fixture.componentInstance;
    component.data = { text: ' amarillo ', rgb: '(255,255,000)' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
