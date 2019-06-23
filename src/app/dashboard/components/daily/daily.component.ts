import { Component, OnInit } from '@angular/core';
import { DailyForecast } from '../../forecast';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { iconHelper } from './helpers/icon.helper';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  public isFound = false;
  public error = null;

  public readonly dailyForecast: DailyForecast = {
    details: {}
  };

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.getDailyWeather();
    });
  }

  ngOnInit() {
  }

  private getDailyWeather(): void {
    this.weatherService.getDailyWeather().subscribe(
      (data: any) => {
        this.isFound = true;
        let currentTime = new Date().getTime();

        currentTime = Math.round(currentTime / 1000);
        this.dailyForecast.isDay = data.sys.sunrise <= currentTime && currentTime <= data.sys.sunset;

        this.dailyForecast.temp = data.main.temp;
        this.dailyForecast.description = data.weather[0].description;
        this.dailyForecast.details.wind = data.wind.speed;
        this.dailyForecast.details.pressure = data.main.pressure;
        this.dailyForecast.details.humidity = data.main.humidity;

        this.dailyForecast.icon = iconHelper(data.weather[0].id, this.dailyForecast.isDay);
      },
      (error: any) => {
        this.isFound = false;
        this.error = error.error.message;
      });
  }
}
