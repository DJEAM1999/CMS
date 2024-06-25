import { Component, OnInit } from '@angular/core';
import { CityService } from '../shared/city/city.service';
import { City } from '../shared/city/city.model';
import { RouterModule, Routes } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styles: [],
})
export class CitiesComponent implements OnInit {
  constructor(public service: CityService, private toastr: ToastrService) {}

  ngOnInit() {
    this.service.refreshList();
  }

  onDelete(id: number) {
    if (confirm('هل أنت متأكد من مسح المدينه المحددة')) {
      this.service.deleteCity(id)
      .subscribe({
        next: (res) => {
          this.service.cities = res as City[];
          this.toastr.error('تم المسح بنجاح');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
