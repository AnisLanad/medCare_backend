import { TestBed } from '@angular/core/testing';

import { SearchedPatientService } from './searched-patient.service';

describe('SearchedPatientService', () => {
  let service: SearchedPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchedPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
