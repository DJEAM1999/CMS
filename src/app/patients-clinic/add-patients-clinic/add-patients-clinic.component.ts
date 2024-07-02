import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from '../../shared/clinic/clinic.model';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { PatientService } from '../../shared/patient/patient.service';
import { Location } from '@angular/common';
import { PatiensClinicService } from '../../shared/patients-clinic/patiens-clinic.service';
import { PatientsClinic } from '../../shared/patients-clinic/patiens-clinic.model';

@Component({
  selector: 'app-add-patients-clinic',
  templateUrl: './add-patients-clinic.component.html',
  styleUrl: './add-patients-clinic.component.css'
})
export class AddPatientsClinicComponent implements OnInit{
  clinics: Clinic[] = [];
  patientsClinic = new PatientsClinic;
  patientsClinicForm: FormGroup = this.fb.group({ // Initialize here
    clinicId: ['', Validators.required]
  });

  constructor(
    public service: PatiensClinicService,
    public clinicService: ClinicService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private Location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.patientsClinicForm = this.fb.group({
      clinicId: ['', Validators.required]
    });

    this.loadClinics();
    this.route.paramMap.subscribe(params => {
      this.patientsClinic.patientId = parseInt(params.get('id')!, 10);
    });
  }

  loadClinics(): void {
    this.clinicService.getClinics().subscribe({
      next: (res: Clinic[]) => {
        this.clinics = res;
      },
      error: (err) => console.error('Error fetching clinics:', err)
    });
  }

  onSubmit() {
    if (this.patientsClinicForm!.valid) {
      this.patientsClinic.clinicId = parseInt(this.patientsClinicForm!.value.clinicId, 10);
      console.log( this.patientsClinic )
      console.log( this.patientsClinic.patientId, 
        this.patientsClinic.clinicId);

      this.service.postPatientsClinic(this.patientsClinic)
      .subscribe({
        next: (res) => {
          console.log('Inserted successfully Clinic Registered');
          this.toastr.success('تمت الاضافة بنجاح');
          this.Location.back();
        },
        error: (err) => {
          if (err.status === 409) { // Check for conflict status code
            this.router.navigate([
              '/patientsClinic',
              this.patientsClinic.patientId, 
              this.patientsClinic.clinicId
            ]);
           
            // this.router.navigate(['/duplicate-entry']); // Navigate to duplicate entry page
            console.log('heeeeere')
          } else {
            this.toastr.error('حدث خطأ غير متوقع');
          }
        },
      });
    }
  }
  // insertRecord(form: NgForm) {
  //   this.service.formsubmitted = true;
  //   console.log(this.service.patientsClinic)
  //   if (form.valid) {
  //     this.service.postPatient()
  //     .subscribe({
  //       next: (res) => {
  //         console.log('Inserted successfully Clinic Registered');
  //         this.toastr.success('تمت الاضافة بنجاح');
  //         this.Location.back();
  //       },
  //       error: (err) => {
  //         console.log( this.service.patientsClinic.patient?.patientId, 
  //           this.service.patientsClinic.clinic?.clinicId);
  //         if (err.status === 409) { // Check for conflict status code
  //           this.router.navigate([
  //             '/patientsClinic',
  //             this.service.patientsClinic.patientId, 
  //             this.service.patientsClinic.clinicId
  //           ]);
           
  //           // this.router.navigate(['/duplicate-entry']); // Navigate to duplicate entry page
  //           console.log('heeeeere')
  //         } else {
  //           this.toastr.error('حدث خطأ غير متوقع');
  //         }
  //       },
  //     });
  //   }
  // }
}
