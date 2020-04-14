import {Weather} from "../types";

const BASE_URL = 'http://api.weatherapi.com/v1';

export default {
  forecast: async (key: string, q: string, days: number) => {
    const r = await fetch(`${BASE_URL}/forecast.json?key=${key}&q=${q}&days=${days}`, {
      method: 'GET',
      headers: {
        'Content-Type': `application/json`
      }
    });

    const {location, current} = await r.json();
    const weather: Weather = {
      name: location.name,
      condition: {
        text: current.condition.text,
        icon: current.condition.icon
      }
    };

    return weather;
  },
}