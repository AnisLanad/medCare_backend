import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrescriptionModalComponent } from './add-radio-modal.component';

describe('AddPrescriptionModalComponent', () => {
  let component: AddPrescriptionModalComponent;
  let fixture: ComponentFixture<AddPrescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrescriptionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
