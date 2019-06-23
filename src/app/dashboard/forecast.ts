export interface DailyForecast {
  temp: number;
  icon: string;
  description: string;
  isDay: boolean;
  wind: number;
  pressure: number;
  humidity: number;
}

export interface ListItem {
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
}

export interface WeeklyForecast {
  date: number;
  dateTxt: string;
  list: ListItem[];
}
