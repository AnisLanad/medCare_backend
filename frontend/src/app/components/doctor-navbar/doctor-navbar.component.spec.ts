import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorNavbarComponent } from './doctor-navbar.component';

describe('DoctorNavbarComponent', () => {
  let component: DoctorNavbarComponent;
  let fixture: ComponentFixture<DoctorNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
