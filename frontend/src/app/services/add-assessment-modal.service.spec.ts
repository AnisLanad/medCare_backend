import { TestBed } from '@angular/core/testing';

import { AddAssessmentModalService } from './add-assessment-modal.service';

describe('AddAssessmentModalService', () => {
  let service: AddAssessmentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddAssessmentModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
