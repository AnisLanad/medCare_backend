import { TestBed } from '@angular/core/testing';

import { SearchByQrCodeModalService } from './search-by-qr-code-modal.service';

describe('SearchByQrCodeModalService', () => {
  let service: SearchByQrCodeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByQrCodeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
