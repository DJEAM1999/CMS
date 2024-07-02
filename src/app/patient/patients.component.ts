import { Component } from '@angular/core';
import { PatientService } from '../shared/patient/patient.service';
import { Patient } from '../shared/patient/patient.model';
import { ClinicService } from '../shared/clinic/clinic.service';
import { Clinic } from '../shared/clinic/clinic.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientsClinic } from '../shared/patients-clinic/patiens-clinic.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styles:[]
})
export class PatientsComponent {
 
  constructor(
    public service: PatientService,
    public clinicService: ClinicService,
    private router: Router,
    private toastr: ToastrService
  ){}
  patientName: string = '';
  clinicName = '';
  patient?: Patient | null;
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
    console.log(this.patientName)
    this.service.getPatientByName(this.patientName).subscribe({
      next: patient => {
        this.patient = patient
        if (!patient) {
          this.router.navigate(['/patient/add-patient']);
        }
      },
    });
  }

  deletePatient() {
    if (confirm('هل انت متأكد من مسح بيانات المريض؟')) {
      this.service.deletePatient(this.patient!.patientId).
      subscribe({
        next: (res) => {
          this.patient = null;
          this.toastr.error('تم المسح بنجاح')
        },
        error: (err) => {
          if (err.status === 409) {
            this.toastr.error('لا يمكن مسح بيانات المريض لأنها تحتوي على ملفات مرضى مرتبطة.');
          } else {
            console.log(err.message);
            this.toastr.error('حدث خطأ غير متوقع');
          }
        },
      });
    }
  }
}
