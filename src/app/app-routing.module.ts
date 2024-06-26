import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { EditCityFormComponent } from './cities/edit-city-form/edit-city-form.component';
import { AddCityFormComponent } from './cities/add-city-form/add-city-form.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { ClinicFormComponent } from './clinics/edit-clinic/clinic-form.component';
import { Patient } from './shared/patient/patient.model';
import { PatientsComponent } from './patient/patients.component';
import { AddClinicComponent } from './clinics/add-clinic/add-clinic.component';
import { PatientsClinicComponent } from './patients-clinic/patients-clinic.component';
// import { PatientFormComponent } from './patient/patient-form/patient-form.component';

const routes: Routes = [
  //City
  { path: 'cities', component: CitiesComponent },
  { path: 'add-city', component: AddCityFormComponent },
  { path: 'edit-city/:id', component: EditCityFormComponent },
  //Clinic
  { path: 'clinics', component: ClinicsComponent },
  { path: 'add-clinic', component: AddClinicComponent },
  { path: 'edit-clinic/:id', component: ClinicFormComponent },
  //Patient
  { path: 'patient', component: PatientsComponent },
  { path: 'patiensClinic/:patientName/:clinicName', component: PatientsClinicComponent },
  // { path: 'add-patient', component: PatientFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
