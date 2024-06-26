import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CitiesComponent } from './cities/cities.component';
import { EditCityFormComponent } from './cities/edit-city-form/edit-city-form.component';
import { AddCityFormComponent } from './cities/add-city-form/add-city-form.component';
import { ClinicFormComponent } from './clinics/edit-clinic/clinic-form.component';
import { ClinicsComponent } from './clinics/clinics.component';
import { PatientsComponent } from './patient/patients.component';
import { RouterModule } from '@angular/router';
import { AddClinicComponent } from './clinics/add-clinic/add-clinic.component';



@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    EditCityFormComponent,
    AddCityFormComponent,
    ClinicsComponent,
    ClinicFormComponent,
    PatientsComponent,
    AddClinicComponent,
    AddClinicComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
