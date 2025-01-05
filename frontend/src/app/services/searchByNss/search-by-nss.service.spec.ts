import { TestBed } from '@angular/core/testing';

import { SearchByNssService } from './search-by-nss.service';

describe('SearchByNssService', () => {
  let service: SearchByNssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByNssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
