import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientsClinicComponent } from './add-patients-clinic.component';

describe('AddPatientsClinicComponent', () => {
  let component: AddPatientsClinicComponent;
  let fixture: ComponentFixture<AddPatientsClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPatientsClinicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPatientsClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
