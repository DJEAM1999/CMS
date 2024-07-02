import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Patient } from '../../shared/patient/patient.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { PatientService } from '../../shared/patient/patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrl: './update-patient.component.css'
})
export class UpdatePatientComponent implements OnChanges{
  @Input() patient!: Patient;
  
  updatePatientForm: FormGroup = this.fb.group({ // Initialize here
    name: ['', Validators.required],
    nationalNo: ['', Validators.required],
    passportNo: ['', Validators.required]
  });

  constructor(
    public service: PatientService,
    public clinicService: ClinicService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    console.log(this.patient)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['patient'] && this.patient) {
      this.updatePatientForm.patchValue({
        name: this.patient.name,
        nationalNo: this.patient.nationalNo,
        passportNo: this.patient.passportNo
      });
    }
  }

  updatePatient() {
    if (this.updatePatientForm!.valid) {
      this.patient.name= this.updatePatientForm!.value.name,
      this.patient.passportNo = this.updatePatientForm!.value.passportNo,
      this.patient.nationalNo = this.updatePatientForm!.value.nationalNo,
      this.service.putPatient(this.patient.patientId ,this.patient)
      .subscribe({
        next: (res) => {
          console.log('Inserted successfully Clinic Registered');
          this.toastr.success('تم التعديل بنجاح');
        },
        error: (err) => {
        
        },
      });
    }
  }
}
