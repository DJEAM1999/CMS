import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { ClinicService } from '../../shared/clinic/clinic.service';
import { CityService } from '../../shared/city/city.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-clinic',
  templateUrl: './add-clinic.component.html',
  styles: [],
})
export class AddClinicComponent {
  constructor(
    public service: ClinicService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private Location: Location
  ) {}

  ngOnInit() {
    this.service.refreshList();
    this.service.getCities()
    console.log(this.service.cities)
  }


  insertRecord(form: NgForm) {
    this.service.formsubmitted = true;
    if (form.valid) {
      this.service.postClinic()
      .subscribe({
        next: (res) => {
          console.log('Inserted successfully Clinic Registered');
          this.toastr.success('تمت الاضافة بنجاح');
          this.Location.back();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('حدث خطأ غير متوقع')
        },
      });
    }
  }
}
