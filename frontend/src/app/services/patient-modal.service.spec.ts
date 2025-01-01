import { TestBed } from '@angular/core/testing';

import { PatientModalService } from './patient-modal.service';

describe('PatientModalService', () => {
  let service: PatientModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
