import {Weather} from "../types";

export default {
  forecast: async (key: string, q: string, days: number) => {
    const weather: Weather = {
      name: q,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/night/116.png'
      }
    };

    return weather;
  },
}