import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientsClinicComponent } from './update-patients-clinic.component';

describe('UpdatePatientsClinicComponent', () => {
  let component: UpdatePatientsClinicComponent;
  let fixture: ComponentFixture<UpdatePatientsClinicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatePatientsClinicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePatientsClinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
