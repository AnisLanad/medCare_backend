import { TestBed } from '@angular/core/testing';

import { MedicalRecordModalService } from './medical-record-modal.service';

describe('MedicalRecordModalService', () => {
  let service: MedicalRecordModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalRecordModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
