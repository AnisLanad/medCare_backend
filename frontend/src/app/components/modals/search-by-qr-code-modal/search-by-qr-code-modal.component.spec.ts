import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByQrCodeModalComponent } from './search-by-qr-code-modal.component';

describe('SearchByQrCodeModalComponent', () => {
  let component: SearchByQrCodeModalComponent;
  let fixture: ComponentFixture<SearchByQrCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByQrCodeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByQrCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
