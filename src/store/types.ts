export interface WeatherDetails {
  temp: number;
  time: string;
  type: string;
  description: string;
  windSpeed: number;
  humidity: number;
  dtText: string;
}

export interface Weather {
  [key: string]: WeatherDetails[];
}

export interface City {
  id: number;
  name: string;
  country: string;
}