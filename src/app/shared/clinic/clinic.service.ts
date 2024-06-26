import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Clinic } from './clinic.model';
import { City } from '../city/city.model';
import { Observable } from 'rxjs';
// import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  constructor(private http: HttpClient) { }
  url: string = environment.apiBaseUrl + '/Clinics'
  clinics: Clinic[] = []
  clinic: Clinic = new Clinic()
  cities: City[] = []
  formsubmitted:boolean = false;

  getCities(){
    this.http.get(environment.apiBaseUrl + '/City')
    .subscribe({
    next: res => {
      this.cities = res as City[];
      console.log(this.cities)
    },
    error: err => console.log(err)
    })
  }

  refreshList() {
    this.http.get(this.url)
    .subscribe({
      next: res => {
        console.log(res)
        this.clinics = res as Clinic[];
      },
      error: err => console.log(err)
    })
  }

  getClinics(): Observable<Clinic[]> {
    return this.http.get<Clinic[]>(this.url);
  }
  
  getClinic(clinicId: number){
    this.http.get(this.url + `/${clinicId}`)
    .subscribe({
      next: res => {
        this.clinic = res as Clinic;
        console.log(res);
        console.log(this.clinic.clinicId);
      },
      error: err => console.log(err)
    })
  }

  putClinic(clinicId: number) {
    console.log(this.clinic)
    console.log('Here the Clinic: '+ this.url + `/${clinicId}`)
    return this.http.put(this.url + `/${clinicId}`, this.clinic)
  }

  postClinic() {
    // console.log('Here is the Clinic: '+ this.url)
    return this.http.post(this.url, this.clinic)
  }

  deleteClinic(id: number) {
    return this.http.delete(this.url + '/' + id)
  }
}