import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientsClinicComponent } from './patients-clinic.component';

describe('PatientsClinicComponent', () => {
  let component: PatientsClinicComponent;
  let fixture: ComponentFixture<PatientsClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientsClinicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientsClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
