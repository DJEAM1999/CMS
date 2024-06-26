import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsClinic } from '../shared/patients-clinic/patiens-clinic.model';
import { PatiensClinicService } from '../shared/patients-clinic/patiens-clinic.service';

@Component({
  selector: 'app-patients-clinic',
  templateUrl: './patients-clinic.component.html',
  styleUrl: './patients-clinic.component.css'
})
export class PatientsClinicComponent {
  patientName?: string;
  clinicName?: string;
  patientsClinic?: PatientsClinic

  constructor(private route: ActivatedRoute, private service: PatiensClinicService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientName = params.get('patientName')!;
      this.clinicName = params.get('clinicName')!;
    });
  
    this.service.getPatientByNameAndClinic(this.patientName!, this.clinicName!).subscribe({
      next: patientsClinic => {
        console.log(patientsClinic)
        this.patientsClinic = patientsClinic!
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
