import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatecityService {
  constructor(private http: HttpClient) {}

  getState(country: string) {
    return this.http.post('https://countriesnow.space/api/v0.1/countries/states', {
      country,
    });
  }

  getCity(country: string, state: string){
    return this.http.post('https://countriesnow.space/api/v0.1/countries/state/cities',{
      country,
      state
    })
  }
}
