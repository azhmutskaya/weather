export class DailyForecast {
  temp: number;
  icon: string;
  description: string;
  isDay: boolean;
  details: {
    wind: number;
    pressure: number;
    humidity: number;
  };
}

export class WeeklyForecast {
  date: number;
  dateTxt: string;
  list: {
    time: number;
    temp: number;
    icon: string;
    description: string;
    isDay: boolean;
    details: {
      wind: number;
      pressure: number;
      humidity: number;
    };
  }[];
}
