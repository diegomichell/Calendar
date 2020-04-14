import {Weather} from "../types";

const BASE_URL = 'https://api.weatherapi.com/v1';

export default {
  forecast: async (key: string, q: string, days: number) => {
    const r = await fetch(`${BASE_URL}/forecast.json?key=${key}&q=${q}&days=${days}`, {
      method: 'GET',
      headers: {
        'Content-Type': `application/json`
      }
    });

    const {location, forecast: {forecastday}} = await r.json();
    const weather: Weather = {
      name: location.name,
      condition: {
        text: forecastday[0] ? forecastday[0].day.condition.text : 'No weather info',
        icon: forecastday[0] ? forecastday[0].day.condition.icon : ''
      }
    };

    return weather;
  },
}