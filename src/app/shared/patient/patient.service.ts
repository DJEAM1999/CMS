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
  url: string = environment.apiBaseUrl + '/Patients'
  patient: Patient = new Patient()

  formsubmitted:boolean = false;

 
  getPatientByName(name: string): Observable<Patient | null> {
    return this.http.get<Patient | null>(`${this.url}/by-name`, {
      params: {
        name: name,
      }
    });
  }

  postPatient(patient: Patient) {
    return this.http.post(this.url, patient)
  }

  putPatient(patientId: number , patient: Patient) {
    return this.http.put(this.url + `/${patientId}`, patient)
  }

    deletePatient(patientId: number) {
    return this.http.delete(this.url + '/' + patientId)
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


}
