import { TestBed } from '@angular/core/testing';

import { NursePatientModalService } from './nurse-patient-modal.service';

describe('PatientModalService', () => {
  let service: NursePatientModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NursePatientModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
