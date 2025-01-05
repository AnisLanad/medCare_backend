import { TestBed } from '@angular/core/testing';

import { AddSummaryModalService } from './add-summary-modal.service';

describe('AddSummaryModalService', () => {
  let service: AddSummaryModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddSummaryModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
