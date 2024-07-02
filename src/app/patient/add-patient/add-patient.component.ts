import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { CityService } from '../../shared/city/city.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../../shared/patient/patient.service';
import { Clinic } from '../../shared/clinic/clinic.model';
import { Patient } from '../../shared/patient/patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  patient!: Patient;
  patientForm: FormGroup = this.fb.group({ // Initialize here
    name: ['', Validators.required],
    nationalNo: ['', Validators.required],
    passportNo: ['', Validators.required]
  });

  constructor(
    public service: PatientService,
    public clinicService: ClinicService,
    private toastr: ToastrService,
    private Location: Location,
    private fb: FormBuilder
  ) {}

  insertRecord() {
    if (this.patientForm!.valid) {
      this.service.postPatient({
        name: this.patientForm!.value.name,
        passportNo: this.patientForm!.value.passportNo,
        nationalNo: this.patientForm!.value.nationalNo,
        } as Patient).subscribe({
        next: (res) => {
          console.log('Inserted successfully Clinic Registered');
          this.toastr.success('تمت الاضافة بنجاح');
          this.Location.back();
        },
        error: (err) => {
        
        },
      });
    }
  }
}
