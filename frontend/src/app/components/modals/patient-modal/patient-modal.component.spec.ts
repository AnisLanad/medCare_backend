import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientModalComponent } from './patient-modal.component';

describe('PatientModalComponent', () => {
  let component: PatientModalComponent;
  let fixture: ComponentFixture<PatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
