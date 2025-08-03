import type { StaticImageData } from "next/image";

/**
 * Returns the appropriate weather icon based on the Open-Meteo weather code.
 */
export function getWeatherImage(code: number): string | StaticImageData {
  // Sunny
  if (code === 0) {
    return "/sunny.png";
  }

  // Cloudy (including fog)
  if ([1, 2].includes(code)) {
    return "/cloudy.png";
  }

  if ([3, 45, 48].includes(code)) {
    return "/cloudy-overcast.png";
  }

  // Rain (drizzle, showers, freezing rain)
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return "/rainy.png";
  }

  // Snow (snow fall, grains, showers)
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return "/snowy.png";
  }

  // Thunderstorm (with and without hail)
  if ([95, 96, 99].includes(code)) {
    return "/thunderstorm.png";
  }

  // Fallback to cloudy
  return "/cloudy.png";
}
