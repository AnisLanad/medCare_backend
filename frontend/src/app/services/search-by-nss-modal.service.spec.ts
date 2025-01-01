import { TestBed } from '@angular/core/testing';

import { SearchByNssModalService } from './search-by-nss-modal.service';

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
