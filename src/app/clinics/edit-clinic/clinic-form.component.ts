import { Component } from '@angular/core';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styles: [],
})
export class ClinicFormComponent {
  constructor(
    public service: ClinicService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  clinicId: number = 0;

  ngOnInit(): void {
    this.service.getCities();
    try {
      this.clinicId = this.route.snapshot.params['id'];
      this.service.getClinic(this.clinicId);
    } catch (error) {
      console.log(error);
    }
    console.log(this.clinicId);
  }

  onSubmit(form: NgForm) {
    this.service.formsubmitted = true;
    if (form.valid) {
      this.updateRecord(form);
    }
  }

  updateRecord(form: NgForm) {
    this.service.putClinic(this.clinicId).subscribe({
      next: (res) => {
        this.toastr.success('تم حفظ التعديل');
        this.location.back();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
