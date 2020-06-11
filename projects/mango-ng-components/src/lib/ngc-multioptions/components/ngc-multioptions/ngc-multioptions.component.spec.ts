import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { FormsModule } from '@angular/forms';
import { NgcMultioptionsComponent } from './ngc-multioptions.component';
import { NgcMultioptionsResultsComponent } from './ngc-multioptions-results/ngc-multioptions-results.component';
import { NgcMultioptionsSelectedComponent } from './ngc-multioptions-selected/ngc-multioptions-selected.component';
import { NgcMultioptionsItemComponent } from './ngc-multioptions-item/ngc-multioptions-item.component';

describe('NgcMultioptionsComponent', () => {
  let component: NgcMultioptionsComponent;
  let fixture: ComponentFixture<NgcMultioptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        NgcMultioptionsComponent,
        NgcMultioptionsResultsComponent,
        NgcMultioptionsSelectedComponent,
        NgcMultioptionsItemComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcMultioptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
