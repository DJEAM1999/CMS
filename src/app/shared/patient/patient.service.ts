import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Patient } from './patient.model';
import { Observable } from 'rxjs';
import { PatientsClinic } from '../patients-clinic/patiens-clinic.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  constructor(private http: HttpClient) { }
  url: string = environment.apiBaseUrl + '/PatientsClinics'
  patient: Patient = new Patient()

  formsubmitted:boolean = false;

  getPatientByNameAndClinic(name: string, clinicName: string): Observable<PatientsClinic | null> {
    return this.http.get<PatientsClinic | null>(`${this.url}/by-name-and-clinic`, {
      params: {
        name: name,
        clinicName: clinicName
      }
    });
  }
  getPatientByName(name: string): Observable<PatientsClinic[] | null> {
    return this.http.get<PatientsClinic[] | null>(`${this.url}/by-name`, {
      params: {
        name: name,
      }
    });
  }

   postPatient() {
    // console.log('Here is the Clinic: '+ this.url)
    return this.http.post(this.url, this.patient)
  }

  // getClinic(clinicId: number){
  //   this.http.get(this.url + `/${clinicId}`)
  //   .subscribe({
  //     next: res => {
  //       this.clinic = res as Clinic;
  //       console.log(res);
  //       console.log(this.clinic.clinicId);
  //     },
  //     error: err => console.log(err)
  //   })
  // }

  // putClinic(clinicId: number) {
  //   console.log(this.clinic)
  //   console.log('Here the Clinic: '+ this.url + `/${clinicId}`)
  //   return this.http.put(this.url + `/${clinicId}`, this.clinic)
  // }

  // postClinic() {
  //   // console.log('Here is the Clinic: '+ this.url)
  //   return this.http.post(this.url, this.clinic)
  // }

  // deleteClinic(id: number) {
  //   return this.http.delete(this.url + '/' + id)
  // }
}
