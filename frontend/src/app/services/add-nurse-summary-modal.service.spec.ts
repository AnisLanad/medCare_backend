import { TestBed } from '@angular/core/testing';

import { NurseDetailsModalService } from './add-nurse-summary-modal.service';

describe('NurseDetailsModalService', () => {
  let service: NurseDetailsModalService

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NurseDetailsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
