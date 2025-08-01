import axios from "axios";
import { getCached, setCached } from "../cache/weatherCache";
import { IWidget } from "../models/Widget";

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  updatedAt: Date; // when the data was last fetched
}

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
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${w.lat}&longitude=${w.lng}&current_weather=true`;
  const res = await axios.get(url);
  const payload = res.data.current_weather;
  const result: WeatherData = {
    temperature: payload.temperature,
    windSpeed: payload.windspeed,
    updatedAt: new Date(),
  };

  // Cache it for future
  setCached<WeatherData>(key, result);

  return result;
}
