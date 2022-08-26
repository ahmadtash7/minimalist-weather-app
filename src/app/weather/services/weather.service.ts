import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootObject } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<RootObject> {
    return this.http.get<RootObject>(environment.baseUrl, {
      params: new HttpParams()
        .set('q', city)
        .set('units', 'metric')
        .set('appid', environment.appid)
    });
  }
}
