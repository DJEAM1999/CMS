import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  getClinicByName(patientName: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
