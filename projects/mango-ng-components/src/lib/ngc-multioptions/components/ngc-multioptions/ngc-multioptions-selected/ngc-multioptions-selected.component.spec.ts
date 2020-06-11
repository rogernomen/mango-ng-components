import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgcMultioptionsSelectedComponent } from './ngc-multioptions-selected.component';
import { NgcMultioptionsItemComponent } from '../ngc-multioptions-item/ngc-multioptions-item.component';

describe('NgcMultioptionsSelectedComponent', () => {
  let component: NgcMultioptionsSelectedComponent;
  let fixture: ComponentFixture<NgcMultioptionsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgcMultioptionsSelectedComponent, NgcMultioptionsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcMultioptionsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
