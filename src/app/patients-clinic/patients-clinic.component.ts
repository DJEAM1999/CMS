import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileStatus, PatientsClinic } from '../shared/patients-clinic/patiens-clinic.model';
import { PatiensClinicService } from '../shared/patients-clinic/patiens-clinic.service';
import { UpdatePatientsClinicComponent } from './update-patients-clinic/update-patients-clinic.component';


@Component({
  selector: 'app-patients-clinic',
  templateUrl: './patients-clinic.component.html',
  styles:[]
})
export class PatientsClinicComponent {
  patientId?: number;
  clinicId?: number;
  patientsClinic?: PatientsClinic

  constructor(private route: ActivatedRoute, private service: PatiensClinicService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.patientId = parseInt(params.get('patientId')!);
      this.clinicId = parseInt(params.get('clinicId')!);
    });
    console.log(this.patientId, this.clinicId)
    this.service.getPatientByNameAndClinic(this.patientId!, this.clinicId!).subscribe({
      next: patientsClinic => {
        console.log(patientsClinic)
        this.patientsClinic = patientsClinic!
      },
      error: err => {
        console.error('Error fetching patient:', err);
        // Handle error appropriately
      }
    });
  }

  fileStatusToString(status: FileStatus){
    switch (status) {
      case FileStatus.Closed:
        return 'Closed';
      case FileStatus.Open:
        return 'Open';
      default:
        throw new Error('Invalid FileStatus value');
    }
  }
}
