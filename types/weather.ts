export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feels_like: number;
  description: string;
  humidity: number;
  wind_speed: number;
  icon: string;
}

export interface ApiError {
  message: string;
  code?: number;
}