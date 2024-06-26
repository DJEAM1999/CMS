import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Patient } from '../patient/patient.model';
import { Observable } from 'rxjs';
import { PatientsClinic } from './patiens-clinic.model';

@Injectable({
  providedIn: 'root'
})
export class PatiensClinicService {

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

}
