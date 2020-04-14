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
    const latest = forecastday.length - 1;
    const forecast = forecastday[latest];
    const weather: Weather = {
      name: location.name,
      condition: {
        text: forecast ? forecast.day.condition.text : 'No weather info',
        icon: forecast ? forecast.day.condition.icon : ''
      }
    };

    return weather;
  },
}