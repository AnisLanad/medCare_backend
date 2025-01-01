import { TestBed } from '@angular/core/testing';

import { AddPrescriptionModalService } from './add-prescription-modal.service';

describe('AddPrescriptionModalService', () => {
  let service: AddPrescriptionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPrescriptionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
