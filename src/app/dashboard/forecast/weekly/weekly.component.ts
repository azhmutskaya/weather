import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { WeeklyForecast } from '../../forecast';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./../../dashboard.component.scss']
})
export class WeeklyComponent implements OnInit {
  isFound = false;
  error = null;
  city = null;

  weeklyForecast: WeeklyForecast[] = [];

  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(() => {
      this.getWeeklyWeather();
      console.log(1);
    });
  }

  ngOnInit() {
  }

  getWeeklyWeather(): void {
    this.weatherService.getWeeklyWeather().subscribe(
      (data: any) => {
        console.log(2);
        this.isFound = true;
        let date;

        this.city = data.city.name;

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
          let icon = '#sunny';

          switch (item.weather[0].id) {
            case 800:
              icon = isDay ? '#sun' : '#moon';
              break;
            case 801:
              icon = isDay ? '#cloudy1' : '#cloudy3';
              break;
            case 802:
              icon = isDay ? '#cloudy2' : '#cloudy3';
              break;
            case 803:
              icon = '#clouds1';
              break;
            case 804:
              icon = '#clouds2';
              break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
              icon = '#rain1';
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
              icon = '#rain2';
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
              icon = '#thunderstorm';
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
              icon = '#snow';
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
              icon = '#mist';
              break;
            default:
              icon = '#logo';
              break;
          }
          if ( date === currentDate) {
            this.weeklyForecast[this.weeklyForecast.length - 1].list.push({
              time,
              temp,
              icon,
              description,
              isDay,
              details: {
                wind,
                pressure,
                humidity,
              }
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
                details: {
                  wind,
                  pressure,
                  humidity,
                }
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
