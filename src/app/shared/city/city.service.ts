import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { City } from './city.model';
import { Observable, catchError, of, tap } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiBaseUrl + '/City';
  cities: City[] = [];
  city: City = new City();
  formData: City = new City();
  formsubmitted: boolean = false;

  restForm(form: NgForm) {
    form.form.reset();
    this.formData = new City();
    this.formsubmitted = false;
  }

  refreshList() {
    this.http.get(this.url).subscribe({
      next: (res) => {
        this.cities = res as City[];
      },
      error: (err) => console.log(err),
    });
  }

  getCity(cityId: number) {
    this.http.get(this.url + `/${cityId}`).subscribe({
      next: (res) => {
        this.city = res as City;
        console.log(res);
        console.log(this.city.cityId);
      },
      error: (err) => console.log(err),
    });
  }

  putCity(cityId: number) {
    console.log('Here the city: ' + this.url + `/${cityId}`);
    return this.http.put(this.url + `/${cityId}`, this.city);
  }

  postCity() {
    console.log('Here is the city: ' + this.url);
    return this.http.post(this.url, this.city);
  }

  deleteCity(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  log(arg0: string) {
    throw new Error('Method not implemented.');
  }

}
