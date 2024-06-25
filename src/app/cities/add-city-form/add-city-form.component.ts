import { Component } from '@angular/core';
import { CityService } from '../../shared/city/city.service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-city-form',
  templateUrl: './add-city-form.component.html',
  styles: [],
})
export class AddCityFormComponent {
  constructor(public service: CityService,
              private toastr:ToastrService,
              private Location:Location) {
    console.log(service.city);
  }

  addCity(form: NgForm) {
    console.log(form);
    this.service.formsubmitted=true
    if (form.valid) {
      this.service.postCity().subscribe({
        next: (res) => {
          console.log('Should created');
          this.toastr.success('تمت الإضافة بنجاح')
          this.Location.back()
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
