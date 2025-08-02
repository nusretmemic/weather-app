import sunnyImg from "@/images/sunny.png";
import cloudyImg from "@/images/cloudy.png";
import cloudyOvercastImg from "@/images/cloudy-overcast.png";
import rainyImg from "@/images/rainy.png";
import snowyImg from "@/images/snowy.png";
import thunderstormImg from "@/images/thunderstorm.png";
import type { StaticImageData } from "next/image";

/**
 * Returns the appropriate weather icon based on the Open-Meteo weather code.
 */
export function getWeatherImage(code: number): StaticImageData {
  // Sunny
  if (code === 0) {
    return sunnyImg;
  }

  // Cloudy (including fog)
  if ([1, 2].includes(code)) {
    return cloudyImg;
  }

  if ([3, 45, 48].includes(code)) {
    return cloudyOvercastImg;
  }

  // Rain (drizzle, showers, freezing rain)
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return rainyImg;
  }

  // Snow (snow fall, grains, showers)
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return snowyImg;
  }

  // Thunderstorm (with and without hail)
  if ([95, 96, 99].includes(code)) {
    return thunderstormImg;
  }

  // Fallback to cloudy
  return cloudyImg;
}
