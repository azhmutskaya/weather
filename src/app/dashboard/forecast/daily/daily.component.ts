import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { DailyForecast } from '../../forecast';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./../../dashboard.component.scss']
})
export class DailyComponent implements OnInit {
  isFound = false;
  error = null;

  dailyForecast: DailyForecast = {
    temp: null,
    icon: null,
    description: null,
    isDay: null,
    details: {
      wind: null,
      pressure: null,
      humidity: null,
    }
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

  getDailyWeather(): void {
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

        switch (data.weather[0].id) {
          case 800:
            this.dailyForecast.icon = this.dailyForecast.isDay ? '#sun' : '#moon';
            break;
          case 801:
            this.dailyForecast.icon = this.dailyForecast.isDay ? '#cloudy1' : '#cloudy3';
            break;
          case 802:
            this.dailyForecast.icon = this.dailyForecast.isDay ? '#cloudy2' : '#cloudy3';
            break;
          case 803:
            this.dailyForecast.icon = '#clouds1';
            break;
          case 804:
            this.dailyForecast.icon = '#clouds2';
            break;
          case 500:
          case 501:
          case 502:
          case 503:
          case 504:
            this.dailyForecast.icon = '#rain1';
            break;
          case 300:
          case 301:
          case 302:
          case 310:
          case 311:
          case 312:
          case 313:
          case 314:
          case 321:
          case 520:
          case 521:
          case 522:
          case 531:
            this.dailyForecast.icon = '#rain2';
            break;
          case 200:
          case 201:
          case 202:
          case 210:
          case 211:
          case 212:
          case 221:
          case 230:
          case 231:
          case 232:
            this.dailyForecast.icon = '#thunderstorm';
            break;
          case 511:
          case 600:
          case 601:
          case 602:
          case 611:
          case 612:
          case 613:
          case 615:
          case 616:
          case 620:
          case 621:
          case 622:
            this.dailyForecast.icon = '#snow';
            break;
          case 701:
          case 711:
          case 721:
          case 731:
          case 741:
          case 751:
          case 761:
          case 762:
          case 771:
          case 781:
            this.dailyForecast.icon = '#mist';
            break;
          default:
            this.dailyForecast.icon = '#logo';
            break;
        }
      },
      (error: any) => {
        this.isFound = false;
        this.error = error.error.message;
      });
  }
}
