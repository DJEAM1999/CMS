import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ClinicService } from '../shared/clinic/clinic.service';
import { Clinic } from '../shared/clinic/clinic.model';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styles: [],
})
export class ClinicsComponent implements OnInit {
  constructor(public service: ClinicService , private toastr:ToastrService) {}
  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(id: number) {
    if (confirm('هل انت متأكد من مسح العيادة؟')) {
      this.service.deleteClinic(id).
      subscribe({
        next: (res) => {
          this.service.refreshList()
          this.service.clinics = res as Clinic[];
          this.toastr.error('تم المسح بنجاح')
          console.log('gggggg',res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
