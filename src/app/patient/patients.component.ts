import { Component } from '@angular/core';
import { PatientService } from '../shared/patient/patient.service';
import { Patient } from '../shared/patient/patient.model';
import { ClinicService } from '../shared/clinic/clinic.service';
import { Clinic } from '../shared/clinic/clinic.model';
import { Router } from '@angular/router';
import { PatientsClinic } from '../shared/patients-clinic/patiens-clinic.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styles:[]
})
export class PatientsComponent {
 
  constructor(public service: PatientService, public clinicService: ClinicService, private router: Router){}
  patientName: string = '';
  clinicName = '';
  patientClinics?: PatientsClinic[] | null
  clinics: Clinic[] = [];

  
  ngOnInit(): void {
    this.loadClinics();
  }

  loadClinics(): void {
    this.clinicService.getClinics().subscribe({
      next: (res: Clinic[]) => {
        this.clinics = res;
      },
      error: (err) => console.error('Error fetching clinics:', err)
    });
  }

  onSubmit(form: any) {
    this.service.getPatientByName(this.patientName).subscribe({
      next: patient => {
        console.log(patient)
        this.patientClinics = patient
        // console.log(patient)
        if (!patient) {
          console.log('not found')
          // Navigate to add new patient page
          this.router.navigate(['/add-new-patient']);
        }
      },
      error: err => {
        console.error('Error fetching patient:', err);
        // Handle error appropriately
      }
    });
  }
}
