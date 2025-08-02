import axios from "axios";
import { getCached, setCached } from "../cache/weatherCache";
import { IWidget } from "../models/Widget";
import { WeatherData } from "../types";

/**
 * Fetch live weather for a widget, with 5-min caching via weatherCache.
 */
export async function getWeather(w: IWidget): Promise<WeatherData> {
  const key = w._id.toString();

  // Check cache
  const cached = getCached<WeatherData>(key);
  if (cached) {
    console.log("☁️  Returning cached weather for widget", key);
    return cached.data;
  }

  // No cache or expired → fetch fresh
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${w.lat}&longitude=${w.lng}&&current=weather_code,temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_min,temperature_2m_max`;
  const res = await axios.get(url);
  const { current, daily } = res.data;
  const result: WeatherData = {
    temperature: current.temperature_2m,
    temperatureMin: daily.temperature_2m_min[0],
    temperatureMax: daily.temperature_2m_max[0],
    windSpeed: current.wind_speed_10m,
    weatherCode: current.weather_code,
    humidity: current.relative_humidity_2m,

    updatedAt: new Date(),
  };

  // Cache it for future
  setCached<WeatherData>(key, result);

  return result;
}
