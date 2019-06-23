import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private api = `https://api.openweathermap.org/data/2.5`;
  private apiKey = '95ce3eb4b52a98ff97183e29a2c4bc05';
  private city;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.city = params.city;
    });
  }

  getDailyWeather(): any {
    return this.http.get(`${this.api}/weather`, {
      params: {
        q: this.city,
        appid: this.apiKey
      }
    });
  }

  getWeeklyWeather(): any {
    return this.http.get(`${this.api}/forecast`, {
      params: {
        q: this.city,
        appid: this.apiKey
      }
    });
  }
}
