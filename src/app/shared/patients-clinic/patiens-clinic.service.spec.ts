import { TestBed } from '@angular/core/testing';

import { PatiensClinicService } from './patiens-clinic.service';

describe('PatiensClinicService', () => {
  let service: PatiensClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatiensClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
