import { WeatherData } from "./interfaces";

export const parseWeatherData = (data: string): WeatherData => {
    return JSON.parse(data) as WeatherData;
  };