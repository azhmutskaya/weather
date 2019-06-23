import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeeklyForecast } from '../../forecast';
import { WeatherService } from '../../services/weather.service';
import {iconHelper} from '../../helpers/icon.helper';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {
  public isFound = false;
  public error = null;

  public readonly weeklyForecast: WeeklyForecast[] = [];

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.getWeeklyWeather();
    });
  }

  ngOnInit() {
  }

  private getWeeklyWeather(): void {
    this.weatherService.getWeeklyWeather().subscribe(
      (data: any) => {
        this.isFound = true;
        let date;

        data.list.forEach((item) => {
          const forecastDate = new Date(item.dt * 1000);
          const currentDate = new Date(forecastDate.getTime() + (forecastDate.getTimezoneOffset() * 60000)).setHours(0, 0, 0, 0);
          const time = item.dt * 1000;
          const temp = item.main.temp;
          const description = item.weather[0].description;
          const isDay = item.sys.pod === 'd';
          const wind = item.wind.speed;
          const pressure = item.main.pressure;
          const humidity = item.main.humidity;
          const icon = iconHelper(item.weather[0].id, isDay);

          if ( date === currentDate) {
            this.weeklyForecast[this.weeklyForecast.length - 1].list.push({
              time,
              temp,
              icon,
              description,
              isDay,
              wind,
              pressure,
              humidity
            });
          } else {
            this.weeklyForecast.push({
              date: item.dt * 1000,
              dateTxt: (new Date(currentDate)).toDateString(),
              list: [{
                time,
                temp,
                icon,
                description,
                isDay,
                wind,
                pressure,
                humidity
              }]
            });
            date = currentDate;
          }
        });
      },
      (error: any) => {
        this.isFound = false;
        this.error = error.error.message;
      });
  }

}
