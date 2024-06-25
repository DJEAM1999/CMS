import { Component, OnInit } from '@angular/core';
import { CityService } from '../../shared/city/city.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-city-form',
  templateUrl: './edit-city-form.component.html',
  styles: []
})
export class EditCityFormComponent implements OnInit {
  cityId: number = 0;

  constructor(
    public service: CityService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cityId = this.route.snapshot.params['id'];
    this.service.getCity(this.cityId);
  }

  updateCity(form: NgForm): void {
    this.service.putCity(this.cityId).subscribe({
      next: res => {
        this.toastr.success('تم حفظ التعديل');
        this.location.back(); // Go back to the previous page
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
