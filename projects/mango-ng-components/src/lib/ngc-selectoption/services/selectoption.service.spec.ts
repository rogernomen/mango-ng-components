import { TestBed, ComponentFixture } from '@angular/core/testing';

import { SelectoptionService } from './selectoption.service';
import { NgcSelectoptionComponent } from '../components/ngc-selectoption/ngc-selectoption.component';
import { FormsModule } from '@angular/forms';

describe('SelectoptionService', () => {
  let component: NgcSelectoptionComponent;
  let fixture: ComponentFixture<NgcSelectoptionComponent>;
  let selectoptionService: SelectoptionService;

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [
      NgcSelectoptionComponent
    ],
    imports: [
      FormsModule
    ]
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgcSelectoptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    selectoptionService = fixture.debugElement.injector.get(SelectoptionService);
  });

  it('should be created', () => {
    expect(selectoptionService).toBeTruthy();
  });
});
