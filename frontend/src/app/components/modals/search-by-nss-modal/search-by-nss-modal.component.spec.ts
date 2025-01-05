import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByNssModalComponent } from './search-by-nss-modal.component';

describe('SearchByNssModalComponent', () => {
  let component: SearchByNssModalComponent;
  let fixture: ComponentFixture<SearchByNssModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByNssModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByNssModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
