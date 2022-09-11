import { makeAutoObservable } from "mobx";
import moment from "moment";
import { City, Weather, WeatherDetails } from "./types";
const {
  REACT_APP_BASE_URL,
  REACT_APP_APP_KEY,
  REACT_APP_DEFAULT_LOCATION,
  REACT_APP_DEFAULT_COUNT,
} = process.env;

type temperature = "C" | "F";

class Store {
  loading: boolean = false;
  error: string = '';
  weather: Weather = {} as Weather;
  city: City = {} as City;
  availableDates: Date[] = [];
  currentTemperature: temperature = "C";
  _kelvin = 273.15;
  currentWeather: WeatherDetails[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setWeather(weather: Weather) {
    this.weather = weather;
  }

  setCity(city: City) {
    this.city = city;
  }

  setAvailableDates(date:Date) {
    this.availableDates = [...this.availableDates, date]
  }

  setCurrentWeather (data:string) {
    this.currentWeather = this.weather[data];
  }

  async loadWeather(city?: string) {
    try {
      const APP_URI: string = `${REACT_APP_BASE_URL}?q=${city || REACT_APP_DEFAULT_LOCATION}&appid=${REACT_APP_APP_KEY}&cnt=${REACT_APP_DEFAULT_COUNT}`;
    this.loading = true;
    this.error = '';
    const res = await fetch(APP_URI);
    const data = await res.json();

    if(data.cod == 404) {
      throw new Error(data.message);
    }

    this.setCity(data.city);

    const tempWeather:any = {};
    
    data.list.forEach((wt: any) => {
      const main = wt.main;
      const dtText = wt.dt_txt;
      const weather = wt.weather;
      const wind = wt.wind;

      const key = moment(dtText).format("MMM Do");
      if (tempWeather[key]) {
        tempWeather[key] = [
          ...tempWeather[key],
          {
            temp: parseFloat(`${main.temp - this._kelvin}`).toFixed(2),
            time: moment(dtText).format("LT"),
            type: weather[0].main,
            description: weather[0].description,
            windSpeed: wind.speed,
            humidity: main.humidity,
            dtText
          },
        ];
      } else {
        if(!this.availableDates.some(dt => dt === dtText)) {
          this.setAvailableDates(dtText);
        }

        tempWeather[key] = [
          {
            temp: parseFloat(`${main.temp - this._kelvin}`).toFixed(2),
            time: moment(dtText).format("LT"),
            type: weather[0].main,
            description: weather[0].description,
            windSpeed: wind.speed,
            humidity: main.humidity,
            dtText
          },
        ];
      }
    });
    this.setWeather(tempWeather);
    this.setCurrentWeather(moment(new Date()).format("MMM Do"));
    this.loading = false;
    } catch (err:any) {
      this.error = err?.message || 'Something went wrong!';
      this.loading = false;
    }
  }

  getWeather (date?:Date): WeatherDetails[] {
    return this.weather[moment(date || new Date()).format("MMM Do")];
  }

  convertToCelsius(temp: number) {
    return ((temp - 32) * 5) / 9;
  }

  convertToFahrenheit(temp: number) {
    return (temp * 9) / 5 + 32;
  }

  toggleTemperature() {
    // this.weather = this.weather.map((wt: any) => {
    //   return {
    //     ...wt,
    //     main: {
    //       ...wt.main,
    //       temp:
    //         this.currentTemperature === "c"
    //           ? this.convertToFahrenheit(wt.main.temp)
    //           : this.convertToCelsius(wt.main.temp),
    //     },
    //   };
    // });
    const tempWeather:Weather = {};
    Object.keys(this.weather).forEach(key => {
      this.weather[key]  =  this.weather[key]?.map(dt => {
        return {
          ...dt,
          temp: this.currentTemperature === 'C' ? this.convertToFahrenheit(dt.temp) : this.convertToCelsius(dt.temp)
        }
      })
    });
    this.currentTemperature = this.currentTemperature === "C" ? "F" : "C";
  }

  useStore() {
    return {
      city: this.city,
      weather: this.weather,
    };
  }
}

const store = new Store();
export default store;
