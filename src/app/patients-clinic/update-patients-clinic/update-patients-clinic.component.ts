import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from '../../shared/clinic/clinic.model';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { FileStatus, PatientsClinic } from '../../shared/patients-clinic/patiens-clinic.model';
import { PatiensClinicService } from '../../shared/patients-clinic/patiens-clinic.service';


@Component({
  selector: 'app-update-patients-clinic',
  templateUrl: './update-patients-clinic.component.html',
  styleUrl: './update-patients-clinic.component.css'
})


export class UpdatePatientsClinicComponent implements OnInit{

  @Input() patientsClinic!: PatientsClinic;
  clinics: Clinic[] = [];

  updatePatientsClinicForm: FormGroup = this.fb.group({ // Initialize here
    fileStatus: ['', Validators.required]
  });

  constructor(
    public service: PatiensClinicService,
    public clinicService: ClinicService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.updatePatientsClinicForm = this.fb.group({
      fileStatus: ['', Validators.required]
    });
  }

  fileStatusLabelMap = [
    { label: 'Closed', value: 0 },
    { label: 'Open', value: 1 },
  ];
  
  onSubmitUpdate() {
    if (this.updatePatientsClinicForm!.valid) {
      const updatedStatus = parseInt(this.updatePatientsClinicForm!.value.fileStatus)
      if(this.patientsClinic.fileStatus != updatedStatus){
        this.patientsClinic.fileStatus = updatedStatus;
        
        if(updatedStatus == 0){
          this.patientsClinic.exitDate = new Date();
        }else{
          this.patientsClinic.entryDate = new Date();
          this.patientsClinic.exitDate = undefined;
        }

        this.service.putPatientsClinic( this.patientsClinic.fileNo, this.patientsClinic)
        .subscribe({
          next: (res) => {
            console.log('Inserted successfully Clinic Registered');
            this.toastr.success('تم التعديل بنجاح');
          },
          error: (err) => {
            this.toastr.error('حدث خطأ غير متوقع');
          },
        });
      }
    }
  }
}
