import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessmentModalComponent } from './add-assessment-modal.component';

describe('AddAssessmentModalComponent', () => {
  let component: AddAssessmentModalComponent;
  let fixture: ComponentFixture<AddAssessmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssessmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssessmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
