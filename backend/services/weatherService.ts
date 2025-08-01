import NodeCache from "node-cache";
import axios from "axios";
import { IWidget } from "../models/Widget";

interface WeatherData {
  temperature: number;
  windSpeed: number;
  description: string;
  updatedAt: Date;
}

const CACHE_TTL_SECONDS = 300; // 5 minutes
const cache = new NodeCache({ stdTTL: CACHE_TTL_SECONDS });

export async function getWeather(w: IWidget): Promise<WeatherData> {
  const key = `${w._id}`;
  const cached = cache.get<WeatherData>(key);
  if (cached) {
    console.log("Returning cached weather data for city ID:", w._id);
    return cached;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${w.lat}&longitude=${w.lng}&current_weather=true`;
  const res = await axios.get(url);
  const payload = res.data.current_weather;
  const result: WeatherData = {
    temperature: payload.temperature,
    windSpeed: payload.windspeed,
    description: payload.weathercode.toString(),
    updatedAt: new Date(),
  };

  // Cache the result
  cache.set(key, result);

  return result;
}
