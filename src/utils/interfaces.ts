export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: { speed: number };
}

export interface HistoryRecord {
  id: number;
  userIdentifier: string;
  cityName: string;
  queryDate: string;
  weatherData: WeatherData;
}
