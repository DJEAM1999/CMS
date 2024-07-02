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
  patientsClinic: PatientsClinic = new PatientsClinic()

  formsubmitted:boolean = false;

  getPatientByNameAndClinic(patientId: number, clinicId: number): Observable<PatientsClinic | null> {
    return this.http.get<PatientsClinic | null>(`${this.url}/by-patientId-and-clinicId`, {
      params: {
        patientId: patientId,
        clinicId: clinicId
      }
    });
  }

  postPatientsClinic(patientsClinic: PatientsClinic) {
    // console.log('Here is the Clinic: '+ this.url)
    return this.http.post(this.url, patientsClinic)
  }

  putPatientsClinic( fileNo: number,patientsClinic: PatientsClinic) {
    return this.http.put(this.url + `/${fileNo}`, patientsClinic)
  }

}
