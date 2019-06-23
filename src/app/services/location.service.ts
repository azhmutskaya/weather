import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private api = 'https://geoip-db.com/json';
  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get(`${this.api}`);
  }
}
