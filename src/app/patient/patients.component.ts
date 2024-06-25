import { Component } from '@angular/core';
import { PatientService } from '../shared/patient/patient.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styles:[]
})
export class PatientsComponent {
  constructor(public service: PatientService){}
  patientName: string = '';

  onSubmit(form: any) {
    this.service.getClinicByName(this.patientName)
  }
}
