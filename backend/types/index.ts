/**
 * The shape of the weather‐lookup result.
 */
export interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
  humidity: number;
  updatedAt: Date;
}

/**
 * What the location‐search endpoint returns.
 */
export interface LocationSuggestion {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
}
