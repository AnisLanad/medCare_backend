import { TestBed } from '@angular/core/testing';

import { SearchByNssModalService } from './pharmacist-modal.service';

describe('SearchByNssModalService', () => {
  let service: SearchByNssModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByNssModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
