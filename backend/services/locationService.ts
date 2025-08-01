import axios from "axios";
import { LocationSuggestion } from "../types";

export async function searchLocations(
  city: string
): Promise<LocationSuggestion[]> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=10&language=en&format=json`;
  const resp = await axios.get(url);

  const results = resp.data.results || [];
  return results.map((r: any) => ({
    id: r.id,
    name: r.name,
    country: r.country,
    lat: r.latitude,
    lng: r.longitude,
  }));
}
