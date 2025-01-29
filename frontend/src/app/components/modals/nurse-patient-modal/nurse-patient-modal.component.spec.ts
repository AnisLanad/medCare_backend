import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursePatientModalComponent } from './nurse-patient-modal.component';

describe('PatientModalComponent', () => {
  let component: NursePatientModalComponent;
  let fixture: ComponentFixture<NursePatientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NursePatientModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NursePatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
